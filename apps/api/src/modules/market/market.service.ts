import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import YahooFinance from 'yahoo-finance2';
import { DatabaseService } from 'src/core/database/database.service';
import {
  FIND_ACTIVE_JOURNALS_SYMBOLS_QUERY,
  UPDATE_CURRENT_PRICE_QUERY,
} from 'src/core/database/sql/market/query';
import { Cron } from '@nestjs/schedule';

const PRICE_CACHE_TTL_MS = 1000 * 60 * 2; // 2분
const REQUEST_DELAY_MS = 250; // Yahoo 요청 간 최소 딜레이(429 완화)
const RATE_LIMIT_BACKOFF_INITIAL_MS = 1000 * 30; // 30초
const RATE_LIMIT_BACKOFF_MAX_MS = 1000 * 60 * 15; // 15분

@Injectable()
export class MarketService implements OnModuleInit {
  private readonly logger = new Logger(MarketService.name);
  /**
   * yahoo-finance2는 내부적으로 여러 요청(crumb/cookie 등)을 병렬로 날릴 수 있어
   * 기본 queue concurrency(4)에서 429(Too Many Requests)가 쉽게 발생합니다.
   * 서버에서 주기적으로 호출하는 용도이므로 동시성을 1로 낮춰 안정성을 우선합니다.
   */
  private yahooFinance = new YahooFinance({ queue: { concurrency: 1 } });
  private readonly priceCache = new Map<
    string,
    { price: number; expiresAtMs: number }
  >();
  private rateLimitCooldownUntilMs = 0;
  private rateLimitBackoffMs = RATE_LIMIT_BACKOFF_INITIAL_MS;

  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    try {
      this.logger.log('Checking database schema for market module...');
      await this.databaseService.query(
        'ALTER TABLE journals ADD COLUMN IF NOT EXISTS current_price DECIMAL(15, 2) DEFAULT NULL',
      );
      this.logger.log('Database schema check passed.');
    } catch (error) {
      this.logger.error('Failed to update database schema:', error);
    }
  }

  @Cron('0 */5 * * * *') // 매 5분마다 실행 (테스트용)
  // @Cron(CronExpression.EVERY_MINUTE) // 디버깅용 1분
  async handleCron() {
    this.logger.debug('Starting market price update...');
    await this.updateMarketPrices();
  }

  async updateMarketPrices() {
    // 1. 활성 일지 조회
    const journals = await this.databaseService.query<{
      id: number;
      symbol: string;
    }>(FIND_ACTIVE_JOURNALS_SYMBOLS_QUERY);

    if (journals.length === 0) {
      this.logger.debug('No active journals found.');
      return;
    }

    this.logger.debug(
      `Found ${journals.length} active journals. fetching prices...`,
    );

    // 2. 심볼 중복 제거 (API 호출 최소화)
    const uniqueSymbols = [...new Set(journals.map((j) => j.symbol))];

    // 3. 가격 조회 및 업데이트
    for (const symbol of uniqueSymbols) {
      if (!symbol) continue;

      try {
        const now = Date.now();
        if (now < this.rateLimitCooldownUntilMs) {
          this.logger.warn(
            `Rate limit cooldown active. Skipping symbol '${symbol}' until ${new Date(this.rateLimitCooldownUntilMs).toISOString()}`,
          );
          continue;
        }

        let currentPrice: number | null = null;
        let targetSymbol = symbol;

        const cached = this.priceCache.get(symbol);
        if (cached && cached.expiresAtMs > now) {
          currentPrice = cached.price;
        }

        let quoteFailedDueToRateLimit = false;

        try {
          // 1차 시도: 입력된 심볼 그대로 조회
          if (!currentPrice) {
            this.logger.debug(`Fetching quote for: ${symbol}`);
            await this.delay(REQUEST_DELAY_MS);

            const quote: any = await this.yahooFinance.quote(symbol);
            if (quote && quote.regularMarketPrice) {
              currentPrice = quote.regularMarketPrice;
              this.priceCache.set(symbol, {
                price: currentPrice ?? 0,
                expiresAtMs: now + PRICE_CACHE_TTL_MS,
              });
              this.onMarketRequestSucceeded();
            }
          }
        } catch (e) {
          if (this.isRateLimitError(e)) {
            quoteFailedDueToRateLimit = true;
            this.onRateLimited(e);
          }
          this.logger.warn(
            `Quote failed for ${symbol}: ${e instanceof Error ? e.message : e}`,
          );
        }

        // 2차 시도: 검색 API로 심볼 찾기 (1차 실패 시)
        // 단, 429(레이트리밋)인 경우 검색까지 연쇄 호출하면 더 악화되므로 시도하지 않음.
        if (!currentPrice && !quoteFailedDueToRateLimit) {
          try {
            this.logger.debug(`Searching symbol for: ${symbol}`);
            await this.delay(REQUEST_DELAY_MS);

            const searchResult: any = await this.yahooFinance.search(symbol);
            if (searchResult.quotes && searchResult.quotes.length > 0) {
              const foundSymbol = searchResult.quotes[0].symbol;
              this.logger.debug(`Mapped '${symbol}' to '${foundSymbol}'`);

              // 찾은 심볼로 다시 조회
              await this.delay(REQUEST_DELAY_MS);

              const quote: any = await this.yahooFinance.quote(foundSymbol);
              if (quote && quote.regularMarketPrice) {
                currentPrice = quote.regularMarketPrice;
                targetSymbol = foundSymbol; // 추후 DB 업데이트 고려
                this.priceCache.set(symbol, {
                  price: currentPrice ?? 0,
                  expiresAtMs: now + PRICE_CACHE_TTL_MS,
                });
                this.onMarketRequestSucceeded();
              }
            }
          } catch (searchError) {
            if (this.isRateLimitError(searchError)) {
              this.onRateLimited(searchError);
            }
            this.logger.warn(
              `Search failed for symbol: ${symbol} - ${searchError instanceof Error ? searchError.message : searchError}`,
            );
          }
        }

        if (currentPrice) {
          // 해당 심볼을 가진 모든 일지 업데이트
          const targetJournals = journals.filter((j) => j.symbol === symbol); // 원래 심볼로 필터링
          for (const journal of targetJournals) {
            await this.databaseService.query(UPDATE_CURRENT_PRICE_QUERY, [
              journal.id,
              currentPrice,
            ]);
          }
          this.logger.log(
            `Updated price for ${symbol} (${targetSymbol}): ${currentPrice}`,
          );
        } else {
          this.logger.warn(`Could not find price for symbol: ${symbol}`);
        }
      } catch (error) {
        this.logger.error(`Error processing symbol ${symbol}:`, error);
      }
    }

    this.logger.debug('Market price update completed.');
  }

  private async delay(ms: number) {
    if (ms <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isRateLimitError(error: unknown) {
    const anyErr = error as { code?: unknown; message?: unknown };
    const code = anyErr?.code;
    if (code === 429) return true;
    if (typeof anyErr?.message === 'string' && anyErr.message.includes('429')) {
      return true;
    }
    if (
      typeof anyErr?.message === 'string' &&
      anyErr.message.toLowerCase().includes('too many requests')
    ) {
      return true;
    }
    return false;
  }

  private onRateLimited(error: unknown) {
    const now = Date.now();
    this.rateLimitCooldownUntilMs = now + this.rateLimitBackoffMs;
    this.rateLimitBackoffMs = Math.min(
      this.rateLimitBackoffMs * 2,
      RATE_LIMIT_BACKOFF_MAX_MS,
    );
    this.logger.warn(
      `Yahoo rate limited (429). Cooling down for ${Math.round((this.rateLimitCooldownUntilMs - now) / 1000)}s. ` +
        `Next backoff=${Math.round(this.rateLimitBackoffMs / 1000)}s. ` +
        `Reason: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  private onMarketRequestSucceeded() {
    // 성공 시 백오프를 초기값으로 리셋(과도한 쿨다운 누적 방지)
    this.rateLimitBackoffMs = RATE_LIMIT_BACKOFF_INITIAL_MS;
  }
}
