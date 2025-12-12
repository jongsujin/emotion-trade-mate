import { JournalEventsEntity } from 'src/modules/emotions/entities/emotions.entities';

export class JournalEntity {
  id: number;
  userId: number;
  symbol: string;
  symbolName: string;
  buyPrice: number;
  initialQuantity: number;
  buyDate: Date;
  totalQuantity: number;
  totalCost: number;
  averageCost: number;
  priceUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class JournalListEntity {
  id: number;
  symbol: string;
  symbolName: string;
  buyPrice: number;
  initialQuantity: number;
  status: JournalStatus;
  buyDate: Date;
  totalQuantity: number;
  averagecost: number;
  createdAt: Date;
  eventCount: number;
  latestEvent: JournalEventsEntity;
}

export class JournalDetailEntity {
  id: number;
  symbol: string;
  symbolName: string;
  buyDate: Date;

  buyPrice: number;
  initialQuantity: number;

  averageCost: number;
  totalCost: number;

  currentPrice: number;
  totalQuantity: number;

  // 평가손익 (보유분 기준)
  profitPercentage: number;
  profit: number;

  // 확정손익(실제 매도해서 확정된 부분)
  realizedProfit: number;

  eventList: JournalEventsEntity[];
}

export enum JournalStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
