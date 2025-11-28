export * from './emotions'
export * from './routes'

/**
 * 앱 전역 설정
 */
export const APP_CONFIG = {
  NAME: 'EmotionTrade',
  DESCRIPTION: '감정 기반 투자 일지',
  PRIMARY_COLOR: '#68CCF4',
  MAX_UPLOAD_PER_DAY: 3,
  MIN_RECORDS_FOR_AI: 5,
} as const

/**
 * API 설정
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  TIMEOUT: 10000,
} as const

/**
 * 파일 업로드 설정
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png'] as const,
  MAX_DAILY_UPLOADS: 3,
} as const
