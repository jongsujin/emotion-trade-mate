/**
 * @description JournalsRepository
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { JournalsEntity } from './entities/journals.entities';
import {
  COUNT_ALL_JOURNALS_QUERY,
  DELETE_JOURNAL_QUERY,
  FIND_ALL_JOURNALS_QUERY,
  FIND_BY_ID_JOURNAL_QUERY,
  INSERT_JOURNAL_QUERY,
  UPDATE_JOURNAL_QUERY,
} from 'src/core/database/sql/journals/query';
import { UpdateJournalDto } from './dto/dto';

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

  async findAll(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<JournalsEntity[]> {
    const values = [userId, limit, offset];
    const result = await this.databaseService.query<JournalsEntity>(
      FIND_ALL_JOURNALS_QUERY,
      values,
    );
    return result;
  }

  async countAll(userId: number): Promise<number> {
    const values = [userId];
    const result = await this.databaseService.query<{ count: string }>(
      COUNT_ALL_JOURNALS_QUERY,
      values,
    );
    return parseInt(result[0].count, 10); // COUNT 결과는 문자열로 올 수 있음
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

  async update(
    userId: number,
    journalId: number,
    dto: UpdateJournalDto,
  ): Promise<JournalsEntity | null> {
    const query = UPDATE_JOURNAL_QUERY;
    const values = [
      userId,
      journalId,
      dto.buyPrice,
      dto.quantity,
      dto.emotionId,
      dto.memo,
    ];
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
