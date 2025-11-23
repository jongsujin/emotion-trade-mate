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
import { UpdateJournalDto } from './dto/dto';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Post()
  async createJournal(
    @Body() journal: JournalsEntity,
  ): Promise<JournalsEntity> {
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
