/**
 * @description JournalsService
 */

import { DatabaseService } from 'src/core/database/database.service';
import { JournalsEntity } from './entities/journals.entities';

export class JournalsService {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }
  async createJournal(journal: JournalsEntity): Promise<JournalsEntity> {
    const query = `
    INSERT INTO journals (user_id, symbol, symbol_name, buy_price, initial_quantity, buy_date, total_quantity, total_cost, average_cost, price_updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `;
    const values = [
      journal.userId,
      journal.symbol,
      journal.symbolName,
      journal.buyPrice,
      journal.initialQuantity,
      journal.buyDate,
      journal.totalQuantity,
      journal.totalCost,
      journal.averageCost,
      journal.priceUpdatedAt,
    ];
    const result = await this.databaseService.query(query, values);
    return result[0] as JournalsEntity;
  }
}
