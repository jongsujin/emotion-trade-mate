import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import YahooFinance from 'yahoo-finance2';
import { DatabaseService } from 'src/core/database/database.service';
import {
  FIND_ACTIVE_JOURNALS_SYMBOLS_QUERY,
  UPDATE_CURRENT_PRICE_QUERY,
} from 'src/core/database/sql/market/query';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MarketService implements OnModuleInit {
  private readonly logger = new Logger(MarketService.name);
  private yahooFinance = new YahooFinance();

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
        let currentPrice: number | null = null;
        let targetSymbol = symbol;

        try {
          // 1차 시도: 입력된 심볼 그대로 조회
          this.logger.debug(`Fetching quote for: ${symbol}`);

          const quote: any = await this.yahooFinance.quote(symbol);
          if (quote && quote.regularMarketPrice) {
            currentPrice = quote.regularMarketPrice;
          }
        } catch (e) {
          this.logger.warn(
            `Quote failed for ${symbol}: ${e instanceof Error ? e.message : e}`,
          );
        }

        // 2차 시도: 검색 API로 심볼 찾기 (1차 실패 시)
        if (!currentPrice) {
          try {
            this.logger.debug(`Searching symbol for: ${symbol}`);

            const searchResult: any = await this.yahooFinance.search(symbol);
            if (searchResult.quotes && searchResult.quotes.length > 0) {
              const foundSymbol = searchResult.quotes[0].symbol;
              this.logger.debug(`Mapped '${symbol}' to '${foundSymbol}'`);

              // 찾은 심볼로 다시 조회

              const quote: any = await this.yahooFinance.quote(foundSymbol);
              if (quote && quote.regularMarketPrice) {
                currentPrice = quote.regularMarketPrice;
                targetSymbol = foundSymbol; // 추후 DB 업데이트 고려
              }
            }
          } catch (searchError) {
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
}
