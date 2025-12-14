/**
 * @description JournalsRepository
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import {
  CreateJournalEntity,
  JournalDetailEntity,
  JournalEntity,
  JournalListEntity,
} from './entities/journals.entities';
import {
  COUNT_ALL_JOURNALS_QUERY,
  DELETE_JOURNAL_QUERY,
  FIND_ALL_JOURNALS_QUERY,
  FIND_BY_ID_JOURNAL_DETAIL_QUERY,
  FIND_BY_ID_JOURNAL_QUERY,
  INSERT_JOURNAL_EVENT_QUERY,
  INSERT_JOURNAL_QUERY,
} from 'src/core/database/sql/journals/query';
import { CreateFirstEmotionDto } from 'src/core/dto/journals.dto';
import { JournalEventType } from '../journal_events/entities/journal_event.entities';

@Injectable()
export class JournalsRepository {
  constructor(private readonly databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async createWithFirstEmotion(
    journal: CreateJournalEntity,
    firstEmotion?: CreateFirstEmotionDto,
  ): Promise<JournalEntity> {
    return await this.databaseService.transaction(async (client) => {
      // 1. Journal 생성
      // 1.1 처음 생성이므로 평단, 총 수량 , 총 가격 등은 백엔드에서 계산
      const totalQuantity = journal.initialQuantity;
      const totalCost = journal.buyPrice * journal.initialQuantity;
      const averageCost = totalCost / journal.initialQuantity;

      const journalValues = [
        journal.userId,
        journal.symbol,
        journal.symbolName,
        journal.buyPrice,
        journal.initialQuantity,
        journal.buyDate,
        totalQuantity,
        totalCost,
        averageCost,
        journal.priceUpdatedAt,
      ];
      const journalResult = await client.query(
        INSERT_JOURNAL_QUERY,
        journalValues,
      );

      // 2. firstEmotion이 있으면 journal_event + journal_event_emotions 생성
      if (firstEmotion) {
        const price = firstEmotion.price ?? journal.buyPrice;
        const eventValues = [
          journalResult.rows[0].id, // journal_id
          JournalEventType.EMOTION,
          price, // price (firstEmotion.price 가 없으면 처음 매수한 가격)
          null, // quantity (Emotion은 Null 이어야 함)
          firstEmotion.memo, // memo
        ];
        const eventResult = await client.query(
          INSERT_JOURNAL_EVENT_QUERY,
          eventValues,
        );
        // 3. 감정 태그 연결
        if (firstEmotion.emotionCodes?.length) {
          for (const emotionCode of firstEmotion.emotionCodes) {
            // emotion_tags에서 Code로 id 조회
            const emotionTagResult = await client.query(
              'SELECT id FROM emotion_tags WHERE code = $1',
              [emotionCode],
            );

            if (emotionTagResult.rows[0]) {
              await client.query(
                'INSERT INTO journal_event_emotions (event_id, emotion_tag_id) VALUES ($1, $2)',
                [eventResult.rows[0].id, emotionTagResult.rows[0].id],
              );
            }
          }
        }
      }
      return journalResult.rows[0] as JournalEntity;
    });
  }

  async findAll(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<JournalListEntity[]> {
    const values = [userId, limit, offset];
    const result = await this.databaseService.query<JournalListEntity>(
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
  ): Promise<JournalEntity | null> {
    const query = FIND_BY_ID_JOURNAL_QUERY;
    const values = [usersId, journalId];
    const result = await this.databaseService.queryOne<JournalEntity>(
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

  async findByIdDetail(
    userId: number,
    journalId: number,
  ): Promise<JournalDetailEntity | null> {
    const query = FIND_BY_ID_JOURNAL_DETAIL_QUERY;
    const values = [userId, journalId];
    const result = await this.databaseService.queryOne<JournalDetailEntity>(
      query,
      values,
    );
    return result ?? null;
  }
}
