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
import { Pagination } from 'src/core/common/types/common';
import { UpdateJournalDto } from '../../core/dto/journals.dto';
import { CurrentUser } from 'src/core/common/decorators/user.decorator';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  async createJournal(
    @Body() journal: JournalsEntity,
    @CurrentUser() user: { userId: number },
  ): Promise<JournalsEntity> {
    journal.userId = user.userId;
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
  ): Promise<Pagination<JournalsEntity>> {
    // 임시 userID 사용
    const userId = 1;

    const result = await this.journalsService.getJournals(userId, page, limit);

    return result;
  }

  @Put(':id')
  async updateJournal(
    @Param('id') id: number,
    @Body() dto: UpdateJournalDto,
  ): Promise<JournalsEntity | null> {
    const userId = 1;
    return await this.journalsService.updateJournal(userId, id, dto);
  }

  @Delete(':id')
  async deleteJournal(@Param('id') id: number): Promise<boolean> {
    const userId = 1;
    return await this.journalsService.deleteJournal(userId, id);
  }
}
