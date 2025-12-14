import type { EmotionType } from '@/constants'

/**
 * 사용자 타입
 */
export interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  createdAt: Date
}

/**
 * 감정 일지 타입 (백엔드 JournalsEntity와 동기화)
 */
export interface Journal {
  id: number
  userId: number
  symbol: string
  symbolName: string
  buyPrice: number
  initialQuantity: number
  buyDate: string // Date를 ISO string으로 받음
  totalQuantity: number
  totalCost: number
  averageCost: number
  priceUpdatedAt: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

/**
 * 일지 생성 요청 타입
 */

export interface CreateFirstEmotionRequest {
  price?: number
  memo?: string
  emotionCodes?: string[]
}
export interface CreateJournalRequest {
  symbol: string
  symbolName: string
  buyPrice: number
  initialQuantity: number
  buyDate: string
  firstEmotion?: CreateFirstEmotionRequest
}

export interface CreateJournalEventRequest {
  type: 'BUY' | 'SELL' | 'EMOTION' | 'NOTE'
  price: number
  quantity?: number
  memo?: string
  emotionCodes?: string[]
}

export interface JournalEventResponse {
  id: number
  journalId: number
  type: 'BUY' | 'SELL' | 'EMOTION' | 'NOTE'
  price: number
  quantity?: number | null
  memo?: string | null
  createdAt: string
  updatedAt?: string | null
}

/**
 * 일지 수정 요청 타입 (백엔드 UpdateJournalDto와 동기화)
 */
export interface UpdateJournalRequest {
  buyPrice?: number
  quantity?: number
  emotionId?: number
  memo?: string
}

/**
 * 감정 기록 타입
 */
export interface EmotionRecord {
  id: string
  journalId: string
  emotionType: EmotionType
  memo: string
  price?: number
  createdAt: Date
}

/**
 * AI 리포트 타입
 */
export interface AIReport {
  id: string
  symbol: string
  userId: string
  analysis: string
  emotionPattern: EmotionPattern[]
  suggestions: string[]
  generatedAt: Date
}

export interface EmotionPattern {
  emotionType: EmotionType
  frequency: number
  avgReturnRate: number
}

/**
 * OCR 결과 타입
 */
export interface OCRResult {
  symbol: string
  symbolName: string
  price: number
  quantity: number
  confidence: number
}

/**
 * API 응답 타입 (백엔드 ApiResponse와 동기화)
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * 페이지네이션 타입 (백엔드 Pagination과 동기화)
 */
export interface Pagination<T> {
  content: T[]
  hasNext: boolean
  hasPrevious: boolean
  totalCount: number
  totalPages: number
  page: number
}
