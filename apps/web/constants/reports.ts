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

export const MOCK_REPORT = {
  symbol: 'AAPL',
  symbolName: 'Apple Inc.',
  emoji: '😊',
  period: '2024.01.15 - 2024.03.15',
  totalRecords: 12,
  dominantEmotion: '자신감',
  dominantEmoji: '😊',
  returnRate: 15.3,
  profit: 2430,
  emotionBreakdown: [
    { emotion: '😊 자신감', count: 5, percentage: 42 },
    { emotion: '🤔 고민', count: 4, percentage: 33 },
    { emotion: '😰 불안', count: 2, percentage: 17 },
    { emotion: '😎 여유', count: 1, percentage: 8 },
  ],
  insights: [
    {
      title: '자신감 있을 때 좋은 성과',
      description: '😊 자신감 있을 때 평균 수익률 +18.2%로 가장 높았어요',
      type: 'positive',
    },
    {
      title: '불안할 때 손절 타이밍 놓침',
      description: '😰 불안한 감정이 들 때 판단이 흐려져 손실이 커졌어요',
      type: 'warning',
    },
    {
      title: '충동적 거래 줄이기',
      description: '하루 3회 이상 기록할 때 수익률이 낮았어요. 여유를 가지세요',
      type: 'info',
    },
  ],
  // 메모 타임라인 추가
  memoTimeline: [
    {
      date: '2024.03.15',
      price: 180.75,
      priceChange: +2.5,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '실적 발표 후 주가 급등. 역시 애플은 믿고 보는 종목이다.',
    },
    {
      date: '2024.03.10',
      price: 176.5,
      priceChange: -1.2,
      emotion: '🤔',
      emotionLabel: '고민',
      memo: '약간의 조정이 있었지만 장기적으로는 상승할 것 같다. 추가 매수 고려 중.',
    },
    {
      date: '2024.03.05',
      price: 178.8,
      priceChange: +3.8,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '뉴스에서 긍정적인 전망 보도. 홀딩 유지.',
    },
    {
      date: '2024.02.28',
      price: 172.3,
      priceChange: -4.2,
      emotion: '😰',
      emotionLabel: '불안',
      memo: '갑자기 하락해서 당황스럽다. 손절할까 고민 중... 일단 지켜보자.',
    },
    {
      date: '2024.02.20',
      price: 179.6,
      priceChange: +5.1,
      emotion: '😊',
      emotionLabel: '자신감',
      memo: '드디어 수익 전환! 기분 좋다.',
    },
  ],
  // 키워드 분석
  keywords: [
    { word: '상승', count: 8 },
    { word: '실적', count: 5 },
    { word: '홀딩', count: 4 },
    { word: '고민', count: 4 },
    { word: '손절', count: 3 },
  ],
}
