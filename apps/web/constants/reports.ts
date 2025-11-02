import { ReportSummaryProps } from '@/types/reports'

export const MOCK_SUMMARY: ReportSummaryProps = {
  totalRecords: 48,
  totalSymbols: 12,
  avgReturnRate: 13.8,
  totalProfit: 12450,
  period: '최근 3개월',
  emotionStats: [
    { emoji: '😊', label: '자신감', count: 18, percentage: 38, avgReturn: 18.2 },
    { emoji: '🤔', label: '고민', count: 12, percentage: 25, avgReturn: 8.5 },
    { emoji: '😰', label: '불안', count: 10, percentage: 21, avgReturn: -2.3 },
    { emoji: '😎', label: '여유', count: 8, percentage: 16, avgReturn: 15.7 },
  ],
  bestSymbol: { symbol: 'NVDA', return: 28.5, emoji: '🤑' },
  worstSymbol: { symbol: 'TSLA', return: -2.35, emoji: '😰' },
  insights: [
    '😊 자신감 있을 때 평균 수익률이 가장 높아요',
    '😰 불안할 때는 손절 타이밍을 놓치는 경향이 있어요',
    '🤔 고민이 많을 때는 중립적인 결과가 나왔어요',
  ],
}
