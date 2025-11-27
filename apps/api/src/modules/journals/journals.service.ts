/**
 * @description JournalsService
 */

import { Injectable } from '@nestjs/common';
import { JournalsRepository } from './journals.repository'; // Repository import
import { JournalsEntity } from './entities/journals.entities';
import { Pagination } from 'src/core/common/types/common';
import { UpdateJournalDto } from '../../core/dto/journals.dto';

@Injectable()
export class JournalsService {
  constructor(private readonly journalsRepository: JournalsRepository) {}

  /**
   * 일지 생성
   */
  async createJournal(journal: JournalsEntity): Promise<JournalsEntity> {
    // DB 저장은 Repository에게 위임
    return await this.journalsRepository.create(journal);
  }

  /**
   * 일지 목록 조회 (페이징)
   */
  async getJournals(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<JournalsEntity>> {
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

  async updateJournal(
    userId: number,
    journalId: number,
    dto: UpdateJournalDto,
  ): Promise<JournalsEntity | null> {
    return await this.journalsRepository.update(userId, journalId, dto);
  }

  async deleteJournal(userId: number, journalId: number): Promise<boolean> {
    return await this.journalsRepository.delete(userId, journalId);
  }
}
