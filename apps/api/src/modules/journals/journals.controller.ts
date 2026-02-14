import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
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
import { Pagination } from '../../core/common/types/common';
import {
  CreateJournalDto,
  CreateJournalEventDto,
  CreateJournalResponseDto,
  JournalDetailResponseDto,
} from '../../core/dto/journals.dto';
import { CurrentUser } from '../../core/common/decorators/user.decorator';
import { JwtAuthGuard } from '../../core/common/guards/jwt-auth.guard';
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
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Journal creation failed',
      });
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
    const detail = await this.journalsService.getJournalDetail(userId, id);
    if (!detail) {
      throw new NotFoundException('Journal not found or access denied');
    }
    return detail;
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
