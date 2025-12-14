import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import {
  JournalEntity,
  JournalListEntity,
  UpdateJournalEntity,
  UpdateJournalEventEntity,
} from './entities/journals.entities';
import { Pagination } from 'src/core/common/types/common';
import {
  CreateJournalDto,
  CreateJournalEventDto,
  CreateJournalResponseDto,
  JournalDetailResponseDto,
} from '../../core/dto/journals.dto';
import { CurrentUser } from 'src/core/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/common/guards/jwt-auth.guard';
import { JournalEventsEntity } from '../journal_events/entities/journal_event.entities';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createJournal(
    @Body() dto: CreateJournalDto,
    @CurrentUser() user: { userId: number },
  ): Promise<CreateJournalResponseDto> {
    try {
      await this.journalsService.createJournal(dto, user.userId);
      return {
        success: true,
        message: 'Journal created successfully',
      };
    } catch (error) {
      // 에러 발생 시 400 Bad Request 반환
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Journal creation failed',
        },
        400,
      );
    }
  }

  @Post(':id/events')
  @UseGuards(JwtAuthGuard)
  async createJournalEvent(
    @CurrentUser() user: { userId: number },
    @Param('id') journalId: number,
    @Body() dto: CreateJournalEventDto,
  ): Promise<JournalEventsEntity> {
    const userId = user.userId;
    return await this.journalsService.createJournalEvent(
      userId,
      journalId,
      dto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getJournals(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @CurrentUser() user: { userId: number },
  ): Promise<Pagination<JournalListEntity>> {
    const userId = user.userId;

    const result = await this.journalsService.getJournals(userId, page, limit);

    return result;
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

  @Get(':id/detail')
  @UseGuards(JwtAuthGuard)
  async getJournalDetail(
    @CurrentUser() user: { userId: number },
    @Param('id') id: number,
  ): Promise<JournalDetailResponseDto | null> {
    const userId = user.userId;
    return await this.journalsService.getJournalDetail(userId, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateJournal(
    @CurrentUser() user: { userId: number },
    @Param('id') id: number,
    @Body() updateData: UpdateJournalEntity,
  ): Promise<JournalEntity | null> {
    const userId = user.userId;
    return await this.journalsService.updateJournal(userId, id, updateData);
  }

  @Patch(':id/events/:eventId')
  @UseGuards(JwtAuthGuard)
  async updateJournalEvent(
    @CurrentUser() user: { userId: number },
    @Param('id') id: number,
    @Param('eventId') eventId: number,
    @Body() updateData: UpdateJournalEventEntity,
  ): Promise<JournalEventsEntity | null> {
    const userId = user.userId;
    return await this.journalsService.updateJournalEvent(
      userId,
      eventId,
      updateData,
    );
  }
}
