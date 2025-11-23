/**
 * @description JournalsModule
 */

import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsRepository } from './journals.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { JournalsController } from './journals.controller';

@Module({
  imports: [DatabaseModule],
  providers: [JournalsService, JournalsRepository],
  exports: [JournalsService],
  controllers: [JournalsController],
})
export class JournalsModule {}
