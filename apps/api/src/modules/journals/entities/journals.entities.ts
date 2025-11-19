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
