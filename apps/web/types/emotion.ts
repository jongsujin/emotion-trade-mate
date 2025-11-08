import { EmotionType } from '@/constants'

export interface EmotionHistoryResponse {
  id: number
  emotionId: EmotionType
  emotion: string // 프론트 상수 처리
  emotionLabel: string // 프론트 상수 처리
  price: number
  quantity: number | null
  memo: string | null
  createdAt: string
}

export interface EmotionCreateRequest {
  emotionId: EmotionType
  price?: number
  quantity?: number
  memo?: string
}
