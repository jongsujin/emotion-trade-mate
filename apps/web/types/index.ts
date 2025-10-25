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
 * 감정 일지 타입
 */
export interface Journal {
  id: string
  userId: string
  symbol: string
  symbolName: string
  buyPrice: number
  quantity: number
  currentPrice?: number
  emotionType: EmotionType
  memo: string
  screenshotUrl?: string
  createdAt: Date
  updatedAt: Date
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
 * API 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * 페이지네이션 타입
 */
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}
