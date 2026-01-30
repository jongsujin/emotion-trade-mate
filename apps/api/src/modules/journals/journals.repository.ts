/**
 * @description JournalsRepository
 */

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../core/database/database.service';
import {
  CreateJournalEntity,
  JournalEntity,
  JournalListEntity,
  JournalStatus,
  UpdateJournalEntity,
  UpdateJournalEventEntity,
} from './entities/journals.entities';
import {
  COUNT_ALL_JOURNALS_QUERY,
  DELETE_JOURNAL_EVENT_EMOTIONS_QUERY,
  DELETE_JOURNAL_QUERY,
  FIND_ALL_JOURNALS_QUERY,
  FIND_BY_ID_JOURNAL_DETAIL_QUERY,
  FIND_BY_ID_JOURNAL_QUERY,
  FIND_JOURNAL_EVENTS_WITH_EMOTIONS_QUERY,
  INSERT_JOURNAL_EVENT_EMOTIONS_BATCH_QUERY,
  INSERT_JOURNAL_EVENT_QUERY,
  INSERT_JOURNAL_QUERY,
  UPDATE_JOURNAL_EVENT_QUERY,
  UPDATE_JOURNAL_QUERY,
} from '../../core/database/sql/journals/query';
import {
  CreateFirstEmotionDto,
  CreateJournalEventDto,
  JournalDetailResponseDto,
} from '../../core/dto/journals.dto';
import {
  JournalEventType,
  JournalEventsEntity,
} from '../journal_events/entities/journal_event.entities';

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

  async createEvent(
    userId: number,
    journalId: number,
    event: CreateJournalEventDto,
  ): Promise<JournalEventsEntity> {
    return await this.databaseService.transaction(async (client) => {
      // 1. journal_event 생성
      const eventValues = [
        journalId, // $1: journal_id
        event.type, // $2: type
        event.price, // $3: price
        event.quantity, // $4: quantity
        event.memo, // $5: memo
      ];
      const eventResult = await client.query(
        INSERT_JOURNAL_EVENT_QUERY,
        eventValues,
      );

      // 2. BUY/SELL 이벤트인 경우 journal의 total_quantity, total_cost, average_cost 업데이트
      if (
        (event.type === 'BUY' || event.type === 'SELL') &&
        event.quantity &&
        event.price
      ) {
        // 현재 journal 정보 조회
        const currentJournalResult = await client.query(
          'SELECT total_quantity, total_cost, realized_profit FROM journals WHERE id = $1 AND user_id = $2',
          [journalId, userId],
        );

        if (currentJournalResult.rows[0]) {
          const current = currentJournalResult.rows[0];
          let newTotalQuantity = Number(current.total_quantity);
          let newTotalCost = Number(current.total_cost);
          let newRealizedProfit = Number(current.realized_profit || 0);

          if (event.type === 'BUY') {
            // 매수: 수량 증가, 비용 증가
            newTotalQuantity += event.quantity;
            newTotalCost += event.price * event.quantity;
          } else if (event.type === 'SELL') {
            // 매도: 수량 감소, 비용 감소 (평균단가 기준)
            // 실현 손익 계산: (매도가 - 평단가) * 수량
            if (newTotalQuantity >= event.quantity) {
              const averageCost =
                newTotalQuantity > 0 ? newTotalCost / newTotalQuantity : 0;

              const tradeProfit = (event.price - averageCost) * event.quantity;
              newRealizedProfit += tradeProfit;

              newTotalQuantity -= event.quantity;
              newTotalCost -= averageCost * event.quantity;
            }
          }

          // 평균단가 재계산
          const newAverageCost =
            newTotalQuantity > 0 ? newTotalCost / newTotalQuantity : 0;

          // journal 업데이트
          await client.query(
            `UPDATE journals
             SET total_quantity = $1, total_cost = $2, average_cost = $3, realized_profit = $4, updated_at = NOW()
             WHERE id = $5 AND user_id = $6`,
            [
              newTotalQuantity,
              newTotalCost,
              newAverageCost,
              newRealizedProfit,
              journalId,
              userId,
            ],
          );
        }
      }

      // 3. emotionCodes가 있으면 감정 태그 연결
      if (event.emotionCodes && event.emotionCodes.length > 0) {
        for (const emotionCode of event.emotionCodes) {
          // emotion_tags에서 code로 id 조회
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

      return eventResult.rows[0] as JournalEventsEntity;
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

  async update(
    userId: number,
    journalId: number,
    journal: UpdateJournalEntity,
  ): Promise<JournalEntity | null> {
    const query = UPDATE_JOURNAL_QUERY;
    const values = [userId, journalId, journal];
    const result = await this.databaseService.queryOne<JournalEntity>(
      query,
      values,
    );
    return result;
  }

  async updateEvent(
    userId: number,
    eventId: number,
    event: UpdateJournalEventEntity,
  ): Promise<JournalEventsEntity | null> {
    return await this.databaseService.transaction(async (client) => {
      // 1. journal_event 메모 업데이트
      const eventValues = [eventId, userId, event.memo];
      const eventResult = await client.query(
        UPDATE_JOURNAL_EVENT_QUERY,
        eventValues,
      );

      // 2. 감정 태그가 있으면 기존 감정 삭제 후 재삽입
      if (event.emotionCodes && event.emotionCodes.length > 0) {
        // 기존 감정 태그 삭제
        await client.query(DELETE_JOURNAL_EVENT_EMOTIONS_QUERY, [eventId]);

        // 새로운 감정 태그 삽입
        const emotionValues = [eventId, event.emotionCodes];
        await client.query(
          INSERT_JOURNAL_EVENT_EMOTIONS_BATCH_QUERY,
          emotionValues,
        );
      }

      return eventResult.rows[0] as JournalEventsEntity;
    });
  }

  async delete(userId: number, journalId: number): Promise<boolean> {
    const query = DELETE_JOURNAL_QUERY;
    const values = [userId, journalId];
    const result = await this.databaseService.query(query, values);
    return result.length > 0;
  }

  async deleteEvent(userId: number, eventId: number): Promise<boolean> {
    const query = DELETE_JOURNAL_EVENT_EMOTIONS_QUERY;
    const values = [userId, eventId];
    const result = await this.databaseService.query(query, values);
    return result.length > 0;
  }

  async findByIdDetail(
    userId: number,
    journalId: number,
  ): Promise<JournalDetailResponseDto | null> {
    // 1. journals 정보 조회
    const journalQuery = FIND_BY_ID_JOURNAL_DETAIL_QUERY;
    const journalValues = [userId, journalId];
    const journalData = await this.databaseService.queryOne<{
      id: number;
      symbol: string;
      symbolName: string;
      buyDate: Date;
      buyPrice: number;
      initialQuantity: number;
      totalQuantity: number;
      totalCost: number;
      averageCost: number;
      realizedProfit: number;
      currentPrice: number | null;
    }>(journalQuery, journalValues);

    if (!journalData) {
      return null;
    }

    // 2. journal_events + 감정 정보 조회
    const eventsQuery = FIND_JOURNAL_EVENTS_WITH_EMOTIONS_QUERY;
    const eventsValues = [journalId];
    const eventsData = await this.databaseService.query<{
      id: number;
      type: string;
      price: number;
      quantity: number | null;
      memo: string | null;
      createdAt: Date;
      emotions: any[];
    }>(eventsQuery, eventsValues);

    // 3. 현재가 조회 (DB에 저장된 최신 가격 사용, 없으면 매수가)
    const currentPrice = journalData.currentPrice
      ? Number(journalData.currentPrice)
      : journalData.buyPrice;

    // 4. 손익 계산
    const totalValue = currentPrice * journalData.totalQuantity; // 현재 평가금액
    const profit = totalValue - journalData.totalCost; // 평가손익
    const profitPercentage =
      journalData.totalCost > 0 ? (profit / journalData.totalCost) * 100 : 0; // 수익률 %

    // 5. 확정손익 (DB에서 가져온 값 사용)
    const realizedProfit = Number(journalData.realizedProfit || 0);

    // 6. 응답 데이터 구성
    return {
      journal: {
        id: journalData.id,
        symbol: journalData.symbol,
        symbolName: journalData.symbolName,
        status: JournalStatus.OPEN, // TODO: 실제 status 필드 추가
        buyDate: journalData.buyDate.toISOString().split('T')[0],
        buyPrice: journalData.buyPrice,
        initialQuantity: journalData.initialQuantity,
        totalQuantity: journalData.totalQuantity,
        totalCost: journalData.totalCost,
        averageCost: journalData.averageCost,
        realizedProfit: realizedProfit,
      },
      metrics: {
        currentPrice,
        profit,
        profitPercentage,
        realizedProfit,
      },
      events: eventsData.map((event) => ({
        id: event.id,
        type: event.type as 'BUY' | 'SELL' | 'NOTE' | 'EMOTION',
        price: event.price,
        quantity: event.quantity,
        memo: event.memo,
        emotions: event.emotions || [],
        createdAt: event.createdAt?.toISOString(),
      })),
    };
  }
}
