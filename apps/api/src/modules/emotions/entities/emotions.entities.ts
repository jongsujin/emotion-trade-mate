export class EmotionsEntity {
  id: number;
  journalId: number;
  emotionId: string;
  price: number;
  quantity: number;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class JournalsEmotionsEntity {
  emotionId: string;
  price: number;
  memo: string;
  createdAt: Date;
}
