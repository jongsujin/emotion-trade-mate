import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsEntity } from './entities/journals.entities';
import { ApiResponse, Pagination } from 'src/core/common/types/common';
import { UpdateJournalDto } from '../../core/dto/journals.dto';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  async createJournal(
    @Body() journal: JournalsEntity,
  ): Promise<JournalsEntity> {
    // TODO: JWT 인증 구현 후 @CurrentUser() 데코레이터로 userId 가져오기
    // 임시로 userId = 1로 하드코딩
    journal.userId = 1;

    // 자동 계산 필드 설정
    journal.totalCost = journal.buyPrice * journal.totalQuantity;
    journal.averageCost = journal.buyPrice;
    journal.priceUpdatedAt = new Date();

    return this.journalsService.createJournal(journal);
  }

  @Get()
  async getJournals(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ApiResponse<Pagination<JournalsEntity>>> {
    // 임시 userID 사용
    const userId = 1;

    const result = await this.journalsService.getJournals(userId, page, limit);

    return {
      success: true,
      data: result,
    };
  }

  @Put(':id')
  async updateJournal(
    @Param('id') id: number,
    @Body() dto: UpdateJournalDto,
  ): Promise<ApiResponse<JournalsEntity | null>> {
    const userId = 1;
    const result = await this.journalsService.updateJournal(userId, id, dto);

    return {
      success: true,
      data: result,
    };
  }

  @Delete(':id')
  async deleteJournal(@Param('id') id: number): Promise<ApiResponse<boolean>> {
    const userId = 1;
    const result = await this.journalsService.deleteJournal(userId, id);

    return {
      success: true,
      data: result,
    };
  }
}
