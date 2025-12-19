export interface EmotionPerformance {
  code: string
  label: string
  winRate: number
  avgProfit: number
  tradeCount: number
}

export interface ReportResponse {
  bestEmotion: EmotionPerformance | null
  worstEmotion: EmotionPerformance | null
  details: EmotionPerformance[]
}
