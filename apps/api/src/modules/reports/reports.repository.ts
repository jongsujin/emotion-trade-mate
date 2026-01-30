import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../core/database/database.service';
import { GET_EMOTION_PERFORMANCE_QUERY } from '../../core/database/sql/reports/query';
import { EmotionPerformanceDto } from '../../core/dto/reports.dto';

@Injectable()
export class ReportsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getEmotionPerformance(
    userId: number,
  ): Promise<EmotionPerformanceDto[]> {
    const rows = await this.databaseService.query<any>(
      GET_EMOTION_PERFORMANCE_QUERY,
      [userId],
    );

    return rows.map((row) => {
      const journalCount = Number(row.journalCount);
      const winCount = Number(row.winCount);
      const totalProfit = Number(row.totalProfit);

      return {
        code: row.code,
        label: row.label,
        tradeCount: journalCount,
        winRate: journalCount > 0 ? (winCount / journalCount) * 100 : 0,
        avgProfit: journalCount > 0 ? totalProfit / journalCount : 0,
      };
    });
  }
}
