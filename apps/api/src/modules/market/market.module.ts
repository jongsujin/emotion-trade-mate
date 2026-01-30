import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
