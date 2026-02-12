import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import YahooFinance from 'yahoo-finance2';

const FX_REFRESH_INTERVAL_MS = 1000 * 60 * 10; // 10분
const FX_STALE_THRESHOLD_MS = 1000 * 60 * 30; // 30분
const USD_KRW_FALLBACK_RATE = 1400;
const USD_KRW_SYMBOL_CANDIDATES = ['KRW=X', 'USDKRW=X'];

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
    if (this.inflightRefresh) {
      await this.inflightRefresh;
      return;
    }

    this.inflightRefresh = this.refreshUsdKrwRate();
    try {
      await this.inflightRefresh;
    } finally {
      this.inflightRefresh = null;
    }
  }

  private async refreshUsdKrwRate() {
    for (const symbol of USD_KRW_SYMBOL_CANDIDATES) {
      try {
        const quote: any = await this.yahooFinance.quote(symbol);
        const parsedRate = Number(quote?.regularMarketPrice);

        if (Number.isFinite(parsedRate) && parsedRate > 0) {
          this.cachedRate = {
            rate: parsedRate,
            updatedAtMs: Date.now(),
          };
          this.logger.debug(`USD/KRW refreshed via ${symbol}: ${parsedRate}`);
          return;
        }
      } catch (error) {
        this.logger.warn(
          `USD/KRW quote failed for ${symbol}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    throw new Error('USD/KRW quote fetch failed for all candidates');
  }
}
