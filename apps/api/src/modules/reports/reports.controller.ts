import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../core/common/guards/jwt-auth.guard';
import {
  DashboardResponseDto,
  ReportResponseDto,
} from '../../core/dto/reports.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('emotions/performance')
  async getEmotionPerformance(@Req() req): Promise<ReportResponseDto> {
    return this.reportsService.getEmotionPerformance(req.user.userId);
  }

  @Get('dashboard')
  async getDashboard(@Req() req): Promise<DashboardResponseDto> {
    return this.reportsService.getDashboard(req.user.userId);
  }
}
