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
