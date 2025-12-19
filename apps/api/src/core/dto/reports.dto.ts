import { IsNumber, IsString } from 'class-validator';

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
