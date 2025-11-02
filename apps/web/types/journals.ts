// ============================================
// 데이터 타입 (서버/DB에서 오는 데이터)
// ============================================

/**
 * 일지 항목 데이터 (서버에서 받는 데이터)
 * 모든 숫자 필드는 number 타입 사용
 */
export interface JournalItemData {
  id: number
  symbol: string
  symbolName: string
  emoji: string
  emotionLabel: string
  emotionCount: number
  returnRate: number
  currentPrice: number
  buyPrice: number
  buyDate: string
  quantity?: number // 수량 (있을 수도, 없을 수도 있음)
}

// ============================================
// 컴포넌트 Props 타입
// ============================================

export interface JournalListProps {
  journals: JournalItemData[]
  href: (id: number) => string
}

export interface JournalItemProps {
  journal: JournalItemData
  href: string
  quantity?: number // 계산용 수량 (기본값 10주)
}

export interface JournalHeaderProps {
  href: string
  totalProfit: number
  avgReturn: number
  holdingCount: number
}

export interface JournalFormProps {
  formData: JournalCreateFormData
  setFormData: React.Dispatch<React.SetStateAction<JournalCreateFormData>>
  selectedEmotion: string | null
  setSelectedEmotion: React.Dispatch<React.SetStateAction<string | null>>
}

// ============================================
// 폼 관련 타입 (React Input의 value는 항상 string)
// ============================================

/**
 * 일지 생성 폼 데이터
 * HTML input의 value는 항상 string이므로 string 타입 사용
 */
export interface JournalCreateFormData {
  symbol: string
  symbolName: string
  price: string // input value는 string
  quantity: string // input value는 string
  memo: string
  emotionId?: string // 선택된 감정 ID
}

// ============================================
// API 요청/응답 타입 (서버 통신용)
// ============================================

/**
 * 일지 생성 API 요청 데이터
 * 서버로 보낼 때는 number 타입으로 변환
 */
export interface JournalCreateRequest {
  symbol: string
  symbolName?: string
  buyPrice: number // string -> number 변환 필요
  quantity: number // string -> number 변환 필요
  emotionId: string
  memo?: string
  buyDate: string // ISO 형식: "2024-01-15"
}

/**
 * 일지 생성 API 응답 데이터
 */
export interface JournalCreateResponse {
  id: number
  symbol: string
  symbolName: string
  buyPrice: number
  quantity: number
  emotionId: string
  memo?: string
  buyDate: string
  createdAt: string
}

// ============================================
// 유틸리티 타입
// ============================================

/**
 * 폼 데이터를 API 요청 데이터로 변환하는 헬퍼 함수의 반환 타입
 */
export type JournalCreateFormToRequest = (
  formData: JournalCreateFormData,
  emotionId: string
) => JournalCreateRequest
