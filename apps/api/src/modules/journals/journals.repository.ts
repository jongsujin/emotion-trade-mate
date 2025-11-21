/**
 * @description JournalsRepository
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { JournalsEntity } from './entities/journals.entities';

const INSERT_JOURNAL_QUERY = /* sql */ `
  INSERT INTO journals (
    user_id, symbol, symbol_name, buy_price, initial_quantity, 
    buy_date, total_quantity, total_cost, average_cost, price_updated_at
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *
`;

const FIND_ALL_JOURNALS_QUERY = /* sql */ `
  SELECT * FROM journals WHERE user_id = $1
`;

const FIND_BY_ID_JOURNAL_QUERY = /* sql */ `
  SELECT * FROM journals WHERE user_id = $1 AND id = $2
`;

const DELETE_JOURNAL_QUERY = `
  DELETE FROM journals 
  WHERE user_id = $1 AND id = $2
  RETURNING id
`;

@Injectable()
export class JournalsRepository {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }
  async create(journal: JournalsEntity): Promise<JournalsEntity> {
    const query = INSERT_JOURNAL_QUERY;
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

  async findAll(userId: number): Promise<JournalsEntity[]> {
    const query = FIND_ALL_JOURNALS_QUERY;
    const values = [userId];
    const result = await this.databaseService.query<JournalsEntity>(
      query,
      values,
    );
    return result;
  }

  async findById(
    usersId: number,
    journalId: number,
  ): Promise<JournalsEntity | null> {
    const query = FIND_BY_ID_JOURNAL_QUERY;
    const values = [usersId, journalId];
    const result = await this.databaseService.queryOne<JournalsEntity>(
      query,
      values,
    );
    return result;
  }

  async delete(userId: number, journalId: number): Promise<boolean> {
    const query = DELETE_JOURNAL_QUERY;
    const values = [userId, journalId];
    const result = await this.databaseService.query(query, values);
    return result.length > 0;
  }
}
