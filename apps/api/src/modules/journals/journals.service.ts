/**
 * @description JournalsService
 */

import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JournalsRepository } from './journals.repository'; // Repository import
import {
  CreateJournalEntity,
  JournalEntity,
  JournalListEntity,
  JournalStatus,
  UpdateJournalEntity,
  UpdateJournalEventEntity,
} from './entities/journals.entities';
import { Pagination } from '../../core/common/types/common';
import {
  CreateJournalDto,
  CreateJournalEventDto,
  JournalDetailResponseDto,
} from '../../core/dto/journals.dto';
import { JournalEventsEntity } from '../journal_events/entities/journal_event.entities';

@Injectable()
export class JournalsService {
  constructor(private readonly journalsRepository: JournalsRepository) {}

  /**
   * 일지 생성
   */

  async createJournal(
    dto: CreateJournalDto,
    userId: number,
  ): Promise<JournalEntity> {
    const journal: CreateJournalEntity = {
      userId,
      symbol: dto.symbol,
      symbolName: dto.symbolName,
      buyPrice: dto.buyPrice,
      initialQuantity: dto.initialQuantity,
      buyDate: new Date(dto.buyDate),
      // 처음 생성이므로 평단, 총 수량 , 총 가격 등은 Repository에서 계산
      totalQuantity: 0,
      totalCost: 0,
      averageCost: 0,
      priceUpdatedAt: new Date(),
      status: JournalStatus.OPEN,
    };
    return await this.journalsRepository.createWithFirstEmotion(
      journal,
      dto.firstEmotion,
    );
  }

  async createJournalEvent(
    userId: number,
    journalId: number,
    dto: CreateJournalEventDto,
  ): Promise<JournalEventsEntity> {
    // 해당 journal이 user의 것인지 검증
    const journal = await this.journalsRepository.findById(userId, journalId);
    if (!journal) {
      throw new NotFoundException('Journal not found or access denied');
    }

    const isTradeEvent = dto.type === 'BUY' || dto.type === 'SELL';
    if (isTradeEvent && (!dto.quantity || dto.quantity <= 0)) {
      throw new BadRequestException(
        'BUY/SELL 이벤트에는 quantity가 필요합니다.',
      );
    }

    if (
      dto.type === 'SELL' &&
      dto.quantity &&
      Number(journal.totalQuantity) < dto.quantity
    ) {
      throw new BadRequestException(
        'SELL 수량이 현재 보유 수량을 초과합니다.',
      );
    }

    if (
      dto.type === 'EMOTION' &&
      (!dto.emotionCodes || dto.emotionCodes.length === 0)
    ) {
      throw new BadRequestException(
        'EMOTION 이벤트에는 대표 감정 1개 이상이 필요합니다.',
      );
    }

    return await this.journalsRepository.createEvent(userId, journalId, dto);
  }

  /**
   * 일지 목록 조회 (페이징)
   */
  async getJournals(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<JournalListEntity>> {
    // 1. 전체 개수 조회
    const totalCount = await this.journalsRepository.countAll(userId);

    // 2. 페이징 계산
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    // 3. 데이터 조회
    const content = await this.journalsRepository.findAll(
      userId,
      limit,
      offset,
    );

    // 4. Pagination 객체 반환
    return {
      content,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
      totalCount,
      totalPages,
      page,
    };
  }

  async deleteJournal(userId: number, journalId: number): Promise<boolean> {
    return await this.journalsRepository.delete(userId, journalId);
  }

  async updateJournal(
    userId: number,
    journalId: number,
    updateData: UpdateJournalEntity,
  ): Promise<JournalEntity | null> {
    return await this.journalsRepository.update(userId, journalId, updateData);
  }

  async updateJournalEvent(
    userId: number,
    eventId: number,
    updateData: UpdateJournalEventEntity,
  ): Promise<any> {
    return await this.journalsRepository.updateEvent(
      userId,
      eventId,
      updateData,
    );
  }

  async getJournalDetail(
    userId: number,
    journalId: number,
  ): Promise<JournalDetailResponseDto | null> {
    return await this.journalsRepository.findByIdDetail(userId, journalId);
  }
}
