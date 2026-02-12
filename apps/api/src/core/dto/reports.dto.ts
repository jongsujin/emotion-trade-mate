import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EmotionPerformanceDto {
  @IsString()
  code: string;

  @IsString()
  label: string;

  @IsNumber()
  winRate: number; // 승률 (0~100)

  @IsNumber()
  avgProfit: number; // 평균 수익

  @IsNumber()
  tradeCount: number; // 관련 매매 횟수(일지 수)
}

export class ReportResponseDto {
  bestEmotion: EmotionPerformanceDto | null;
  worstEmotion: EmotionPerformanceDto | null;
  details: EmotionPerformanceDto[];
}

export class DashboardSummaryDto {
  @IsNumber()
  totalProfit: number;

  @IsNumber()
  realizedProfit: number;

  @IsNumber()
  unrealizedProfit: number;

  @IsNumber()
  totalCost: number;

  @IsNumber()
  winRate: number;

  @IsNumber()
  tradeCount: number;
}

export class DailyPnlDto {
  @IsString()
  date: string;

  @IsNumber()
  profit: number;
}

export class TodayEmotionDto {
  @IsString()
  code: string;

  @IsString()
  label: string;
}

export class DashboardResponseDto {
  summary: DashboardSummaryDto;
  recentTrend: DailyPnlDto[];
  todayEmotion: TodayEmotionDto | null;
  fx: DashboardFxDto;
}

export class DashboardFxDto {
  @IsString()
  baseCurrency: string;

  @IsString()
  quoteCurrency: string;

  @IsNumber()
  usdKrwRate: number;

  @IsOptional()
  @IsString()
  updatedAt?: string | null;

  @IsBoolean()
  stale: boolean;

  @IsString()
  source: 'cache' | 'live' | 'fallback';
}
