/**
 * @description JournalsService
 */

import { Injectable } from '@nestjs/common';
import { JournalsRepository } from './journals.repository'; // Repository import
import {
  CreateJournalEntity,
  JournalEntity,
  JournalListEntity,
  JournalStatus,
} from './entities/journals.entities';
import { Pagination } from 'src/core/common/types/common';
import {
  CreateJournalDto,
  JournalDetailResponseDto,
} from 'src/core/dto/journals.dto';

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

  async getJournalDetail(
    userId: number,
    journalId: number,
  ): Promise<JournalDetailResponseDto | null> {
    return await this.journalsRepository.findByIdDetail(userId, journalId);
  }
}
