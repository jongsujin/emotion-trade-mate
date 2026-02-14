import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import YahooFinance from 'yahoo-finance2';

const FX_REFRESH_INTERVAL_MS = 1000 * 60 * 10; // 10분
const FX_STALE_THRESHOLD_MS = 1000 * 60 * 30; // 30분
const USD_KRW_FALLBACK_RATE = 1400;
const USD_KRW_SYMBOL_CANDIDATES = ['KRW=X', 'USDKRW=X'];
const RATE_LIMIT_BACKOFF_INITIAL_MS = 1000 * 30; // 30초
const RATE_LIMIT_BACKOFF_MAX_MS = 1000 * 60 * 15; // 15분
const REFRESH_RETRY_BACKOFF_INITIAL_MS = 1000 * 60; // 1분
const REFRESH_RETRY_BACKOFF_MAX_MS = 1000 * 60 * 15; // 15분
const OPEN_ER_API_URL = 'https://open.er-api.com/v6/latest/USD';

export type UsdKrwRateResult = {
  rate: number;
  updatedAt: string | null;
  isStale: boolean;
  source: 'cache' | 'live' | 'fallback';
};

@Injectable()
export class FxService implements OnModuleInit {
  private readonly logger = new Logger(FxService.name);
  private readonly yahooFinance = new YahooFinance({
    queue: { concurrency: 1 },
  });
  private cachedRate: { rate: number; updatedAtMs: number } | null = null;
  private inflightRefresh: Promise<void> | null = null;
  private yahooRateLimitCooldownUntilMs = 0;
  private yahooRateLimitBackoffMs = RATE_LIMIT_BACKOFF_INITIAL_MS;
  private refreshBlockedUntilMs = 0;
  private refreshRetryBackoffMs = REFRESH_RETRY_BACKOFF_INITIAL_MS;

  async onModuleInit() {
    try {
      await this.refreshUsdKrwRate();
    } catch (error) {
      this.logger.warn(
        `Initial USD/KRW fetch failed. fallback will be used until next refresh. reason=${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  @Cron('0 */10 * * * *') // 매 10분
  async refreshUsdKrwRateCron() {
    try {
      await this.refreshUsdKrwRate();
    } catch (error) {
      this.logger.warn(
        `Scheduled USD/KRW refresh failed. keeping previous cache. reason=${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async getUsdKrwRate(): Promise<UsdKrwRateResult> {
    const now = Date.now();
    const wasFreshBeforeRefresh =
      this.cachedRate !== null &&
      now - this.cachedRate.updatedAtMs < FX_REFRESH_INTERVAL_MS;
    let refreshedNow = false;

    if (!wasFreshBeforeRefresh) {
      try {
        await this.ensureRefreshed();
        refreshedNow = true;
      } catch (error) {
        this.logger.warn(
          `USD/KRW refresh on-demand failed. fallback/cache will be used. reason=${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    if (!this.cachedRate) {
      return {
        rate: USD_KRW_FALLBACK_RATE,
        updatedAt: null,
        isStale: true,
        source: 'fallback',
      };
    }

    const isStale = now - this.cachedRate.updatedAtMs > FX_STALE_THRESHOLD_MS;
    return {
      rate: this.cachedRate.rate,
      updatedAt: new Date(this.cachedRate.updatedAtMs).toISOString(),
      isStale,
      source: wasFreshBeforeRefresh
        ? 'cache'
        : refreshedNow
          ? 'live'
          : 'cache',
    };
  }

  private async ensureRefreshed() {
    const now = Date.now();
    if (now < this.refreshBlockedUntilMs) {
      this.logger.debug(
        `FX refresh blocked until ${new Date(this.refreshBlockedUntilMs).toISOString()} due to recent failures.`,
      );
      return;
    }

    if (this.inflightRefresh) {
      await this.inflightRefresh;
      return;
    }

    this.inflightRefresh = this.refreshUsdKrwRate();
    try {
      await this.inflightRefresh;
      this.refreshBlockedUntilMs = 0;
      this.refreshRetryBackoffMs = REFRESH_RETRY_BACKOFF_INITIAL_MS;
    } catch (error) {
      const retryAt = Date.now() + this.refreshRetryBackoffMs;
      this.refreshBlockedUntilMs = retryAt;
      this.refreshRetryBackoffMs = Math.min(
        this.refreshRetryBackoffMs * 2,
        REFRESH_RETRY_BACKOFF_MAX_MS,
      );
      throw error;
    } finally {
      this.inflightRefresh = null;
    }
  }

  private async refreshUsdKrwRate() {
    const now = Date.now();
    if (now >= this.yahooRateLimitCooldownUntilMs) {
      for (const symbol of USD_KRW_SYMBOL_CANDIDATES) {
        try {
          const quote: any = await this.yahooFinance.quote(symbol);
          const parsedRate = Number(quote?.regularMarketPrice);

          if (Number.isFinite(parsedRate) && parsedRate > 0) {
            this.cachedRate = {
              rate: parsedRate,
              updatedAtMs: Date.now(),
            };
            this.onMarketRequestSucceeded();
            this.logger.debug(`USD/KRW refreshed via ${symbol}: ${parsedRate}`);
            return;
          }
        } catch (error) {
          if (this.isRateLimitError(error)) {
            this.onRateLimited(error);
            break;
          }
          this.logger.warn(
            `USD/KRW quote failed for ${symbol}: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }
    } else {
      this.logger.warn(
        `Skipping Yahoo FX fetch due to cooldown until ${new Date(this.yahooRateLimitCooldownUntilMs).toISOString()}.`,
      );
    }

    try {
      const rate = await this.fetchUsdKrwFromOpenErApi();
      this.cachedRate = {
        rate,
        updatedAtMs: Date.now(),
      };
      this.logger.debug(`USD/KRW refreshed via open.er-api: ${rate}`);
      return;
    } catch (error) {
      this.logger.warn(
        `USD/KRW fallback provider failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    throw new Error('USD/KRW quote fetch failed for all candidates');
  }

  private async fetchUsdKrwFromOpenErApi() {
    const response = await fetch(OPEN_ER_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`open.er-api status=${response.status}`);
    }

    const data = (await response.json()) as {
      result?: string;
      rates?: Record<string, unknown>;
    };

    const rate = Number(data?.rates?.KRW);
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error('open.er-api KRW rate is invalid');
    }
    return rate;
  }

  private isRateLimitError(error: unknown) {
    const anyErr = error as { code?: unknown; message?: unknown };
    if (anyErr?.code === 429) return true;
    if (
      typeof anyErr?.message === 'string' &&
      (anyErr.message.includes('429') ||
        anyErr.message.toLowerCase().includes('too many requests'))
    ) {
      return true;
    }
    return false;
  }

  private onRateLimited(error: unknown) {
    const now = Date.now();
    this.yahooRateLimitCooldownUntilMs = now + this.yahooRateLimitBackoffMs;
    this.yahooRateLimitBackoffMs = Math.min(
      this.yahooRateLimitBackoffMs * 2,
      RATE_LIMIT_BACKOFF_MAX_MS,
    );
    this.logger.warn(
      `Yahoo FX rate limited (429). cooling down for ${Math.round((this.yahooRateLimitCooldownUntilMs - now) / 1000)}s. ` +
        `next backoff=${Math.round(this.yahooRateLimitBackoffMs / 1000)}s. ` +
        `reason=${error instanceof Error ? error.message : String(error)}`,
    );
  }

  private onMarketRequestSucceeded() {
    this.yahooRateLimitBackoffMs = RATE_LIMIT_BACKOFF_INITIAL_MS;
    this.yahooRateLimitCooldownUntilMs = 0;
  }
}
