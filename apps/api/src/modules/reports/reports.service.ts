import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import {
  DashboardResponseDto,
  ReportResponseDto,
} from '../../core/dto/reports.dto';
import { FxService } from '../fx/fx.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly fxService: FxService,
  ) {}

  async getEmotionPerformance(userId: number): Promise<ReportResponseDto> {
    const fxInfo = await this.fxService.getUsdKrwRate();
    const stats = await this.reportsRepository.getEmotionPerformance(
      userId,
      fxInfo.rate,
    );

    // 승률 높은 순 & 수익금 높은 순 등으로 정렬 로직 고도화 가능
    // 여기서는 '평균 수익' 기준으로 Best/Worst 선정
    const sortedByProfit = [...stats].sort((a, b) => b.avgProfit - a.avgProfit);

    const bestEmotion = sortedByProfit.length > 0 ? sortedByProfit[0] : null;
    const worstEmotion =
      sortedByProfit.length > 0
        ? sortedByProfit[sortedByProfit.length - 1]
        : null;

    return {
      bestEmotion,
      worstEmotion,
      details: sortedByProfit,
    };
  }

  async getDashboard(userId: number): Promise<DashboardResponseDto> {
    const fxInfo = await this.fxService.getUsdKrwRate();

    const [summary, recentTrend, todayEmotion] = await Promise.all([
      this.reportsRepository.getDashboardSummary(userId, fxInfo.rate),
      this.reportsRepository.getRecentPnl(userId, fxInfo.rate),
      this.reportsRepository.getTodayEmotion(userId),
    ]);

    const tradeCount = summary ? Number(summary.tradeCount) : 0;
    const winCount = summary ? Number(summary.winCount) : 0;
    const winRate = tradeCount > 0 ? (winCount / tradeCount) * 100 : 0;

    return {
      summary: {
        totalProfit: summary
          ? Number(summary.realizedProfit) + Number(summary.unrealizedProfit)
          : 0,
        realizedProfit: summary ? Number(summary.realizedProfit) : 0,
        unrealizedProfit: summary ? Number(summary.unrealizedProfit) : 0,
        totalCost: summary ? Number(summary.totalCost) : 0,
        tradeCount,
        winRate: parseFloat(winRate.toFixed(1)),
      },
      recentTrend: recentTrend.map((r) => ({
        ...r,
        profit: Number(r.profit),
      })),
      todayEmotion: todayEmotion
        ? { code: todayEmotion.code, label: todayEmotion.label }
        : null,
      fx: {
        baseCurrency: 'KRW',
        quoteCurrency: 'USD',
        usdKrwRate: fxInfo.rate,
        updatedAt: fxInfo.updatedAt,
        stale: fxInfo.isStale,
        source: fxInfo.source,
      },
    };
  }
}
