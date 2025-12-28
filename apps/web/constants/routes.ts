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
    DETAIL: (id: number) => `/journal/${id}`,
    ADD_EMOTION: (id: string) => `/journal/${id}/emotion`,
  },

  // AI 리포트
  REPORT: {
    INDEX: '/report',
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
    LIST: '/api/journals', // GET
    CREATE: '/api/journals', // POST
    DETAIL: (id: string) => `/api/journals/${id}/detail`, // GET
    UPDATE: (id: string) => `/api/journals/${id}`, // PUT
    DELETE: (id: string) => `/api/journals/${id}`, // DELETE
    CREATE_EVENT: (id: string) => `/api/journals/${id}/events`, // POST
    ADD_EMOTION: (id: string) => `/api/journals/${id}/emotion`,
  },
  OCR: {
    UPLOAD: '/ocr/upload',
    EXTRACT: '/ocr/extract',
  },
  REPORT: {
    GENERATE: '/report/generate',
    DETAIL: (id: string) => `/report/${id}`,
    PDF: (id: string) => `/report/${id}/pdf`,
  },
} as const
