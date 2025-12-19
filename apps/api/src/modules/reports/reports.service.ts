import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { ReportResponseDto } from 'src/core/dto/reports.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async getEmotionPerformance(userId: number): Promise<ReportResponseDto> {
    const stats = await this.reportsRepository.getEmotionPerformance(userId);

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
}
