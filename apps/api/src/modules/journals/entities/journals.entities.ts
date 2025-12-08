import { JournalsEmotionsEntity } from 'src/modules/emotions/entities/emotions.entities';

export class JournalsEntity {
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

export class JournalsListEntity {
  id: number;
  symbol: string;
  symbolName: string;
  buyPrice: number;
  initialQuantity: number;
  buyDate: Date;
  totalQuantity: number;
  averagecost: number;
  createdAt: Date;
  emotionCount: number;
  latestEmotion: JournalsEmotionsEntity;
}
