import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import {
  JournalEntity,
  // JournalsListEntity,
} from './entities/journals.entities';
import { Pagination } from 'src/core/common/types/common';
import {
  CreateJournalDto,
  UpdateJournalDto,
} from '../../core/dto/journals.dto';
import { CurrentUser } from 'src/core/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/common/guards/jwt-auth.guard';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJournal(
    @Body() dto: CreateJournalDto,
    @CurrentUser() user: { userId: number },
  ): Promise<JournalEntity> {
    const journal = new JournalEntity();
    journal.userId = user.userId;
    journal.symbol = dto.symbol;
    journal.symbolName = dto.symbolName;
    journal.buyPrice = dto.buyPrice;
    journal.initialQuantity = dto.initialQuantity;
    journal.buyDate = new Date(dto.buyDate);
    journal.totalQuantity = dto.totalQuantity;
    journal.totalCost = dto.buyPrice * dto.totalQuantity;
    journal.averageCost = dto.buyPrice;
    journal.priceUpdatedAt = new Date();
    return this.journalsService.createJournal(journal);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getJournals(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @CurrentUser() user: { userId: number },
  ): Promise<Pagination<JournalEntity>> {
    const userId = user.userId;

    const result = await this.journalsService.getJournals(userId, page, limit);

    return result;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateJournal(
    @CurrentUser() user: { userId: number },
    @Param('id') id: number,
    @Body() dto: UpdateJournalDto,
  ): Promise<JournalEntity | null> {
    const userId = user.userId;
    return await this.journalsService.updateJournal(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteJournal(
    @CurrentUser() user: { userId: number },
    @Param('id') id: number,
  ): Promise<boolean> {
    const userId = user.userId;
    return await this.journalsService.deleteJournal(userId, id);
  }
}
