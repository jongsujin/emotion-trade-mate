/**
 * 앱 내 라우트 경로 상수
 * 중앙 집중식 라우트 관리
 */

export const ROUTES = {
  // 온보딩 & 홈
  HOME: '/',

  // 인증
  LOGIN: '/login',
  SIGNUP: '/signup',

  // 감정 일지
  JOURNAL: {
    LIST: '/journal/list',
    CREATE: '/journal/create',
    DETAIL: (id: string) => `/journal/${id}`,
    ADD_EMOTION: (id: string) => `/journal/${id}/emotion`,
  },

  // AI 리포트
  REPORT: {
    DETAIL: (id: string) => `/report/${id}`,
    SUMMARY: '/report/summary',
  },

  // 설정
  SETTINGS: '/settings',

  // 에러
  NOT_FOUND: '/404',
  ERROR: '/error',
} as const

/**
 * API 엔드포인트 경로
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  JOURNAL: {
    LIST: '/api/journal',
    CREATE: '/api/journal',
    DETAIL: (id: string) => `/api/journal/${id}`,
    UPDATE: (id: string) => `/api/journal/${id}`,
    DELETE: (id: string) => `/api/journal/${id}`,
    ADD_EMOTION: (id: string) => `/api/journal/${id}/emotion`,
  },
  OCR: {
    UPLOAD: '/api/ocr/upload',
    EXTRACT: '/api/ocr/extract',
  },
  REPORT: {
    GENERATE: '/api/report/generate',
    DETAIL: (id: string) => `/api/report/${id}`,
    PDF: (id: string) => `/api/report/${id}/pdf`,
  },
} as const
