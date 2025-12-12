export enum JournalEventType {
  BUY = 'BUY',
  SELL = 'SELL',
  EMOTION = 'EMOTION',
  NOTE = 'NOTE',
}

export class JournalEventsEntity {
  id: number;
  journalId: number;
  type: JournalEventType;
  memo?: string;

  price?: number; // BUY / SELL / EMOTION 모두 시점 가격 기록
  quantity?: number; // BUY(+), SELL(-)일 때 사용

  createdAt: Date;
}
