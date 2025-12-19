import { JournalEventsEntity } from 'src/modules/journal_events/entities/journal_event.entities';

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
  realizedProfit: number;
  priceUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  status: JournalStatus;
}

export class CreateJournalEntity {
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
  status: JournalStatus;
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
  averageCost: number;
  realizedProfit: number;
  createdAt: Date;
  eventCount: number;
  primaryEmotion?: string;
  primaryEmotionLabel?: string;
  latestEvent: JournalEventsEntity;
}

export class UpdateJournalEntity {
  symbolName?: string;
  status?: JournalStatus;
}

export class UpdateJournalEventEntity {
  memo?: string;
  emotionCodes?: string[];
}

export class DeleteJournalEntity {
  id: number;
}

export class DeleteJournalEventEntity {
  id: number;
}

export enum JournalStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
