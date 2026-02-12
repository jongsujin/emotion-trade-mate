import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { DatabaseModule } from '../../core/database/database.module';
import { FxModule } from '../fx/fx.module';

@Module({
  imports: [DatabaseModule, FxModule],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
