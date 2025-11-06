/**
 * @description 리포트 분석 페이지
 */

export interface ReportStockInfoProps {
  emoji: string
  symbol: string
  returnRate: number
  profit: number
  period: string
  totalRecords: number
  symbolName: string
}

export interface ReportEmotionsProps {
  dominantEmoji: string
  dominantEmotion: string
  percentage: number
}

export interface ReportSummaryProps {
  totalRecords: number
  totalSymbols: number
  avgReturnRate: number
  totalProfit: number
  period: string
  emotionStats: EmotionStatProps[]
  bestSymbol: BestSymbolProps
  worstSymbol: WorstSymbolProps
  insights: string[] // 임시
}

export interface EmotionStatProps {
  emoji: string
  label: string
  count: number
  percentage: number
  avgReturn: number
}

export interface BestSymbolProps {
  symbol: string
  return: number
  emoji: string
}

export interface WorstSymbolProps {
  symbol: string
  return: number
  emoji: string
}

export interface EmotionBreakdownItem {
  emotion: string
  count: number
  percentage: number
}

export interface ReportEmotionBreakdownProps {
  emotionBreakdown: EmotionBreakdownItem[]
}

export interface KeywordItem {
  word: string
  count: number
}

export interface ReportKeywordsProps {
  keywords: KeywordItem[]
}

export interface MemoTimelineEntry {
  date: string
  price: number
  priceChange: number
  emotion: string
  emotionLabel: string
  memo: string
}

export interface ReportMemoTimelineProps {
  memoTimeline: MemoTimelineEntry[]
}

export interface InsightItem {
  title: string
  description: string
  type: 'positive' | 'warning' | 'info'
}

export interface ReportAIInsightsProps {
  insights: InsightItem[]
}

export interface ReportPdfDownloadProps {
  onDownload?: () => void
}

export interface ReportDetailData {
  symbol: string
  symbolName: string
  emoji: string
  period: string
  totalRecords: number
  dominantEmotion: string
  dominantEmoji: string
  returnRate: number
  profit: number
  emotionBreakdown: EmotionBreakdownItem[]
  insights: InsightItem[]
  memoTimeline: MemoTimelineEntry[]
  keywords: KeywordItem[]
}
