import type { EmotionType } from '@/constants/emotions'

/**
 * @description 일지 리스트 아이템 타입
 *
 */

export interface JournalListItemProps {
  id: number
  userId: number
  symbol: string
  symbolName: string
  buyPrice: number
  initialQuantity: number
  buyDate: string
  totalQuantity: number
  totalCost: number
  averageCost: number
  realizedProfit: number
  priceUpdatedAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  eventCount: number
  primaryEmotion: string
  primaryEmotionLabel: string
  latestEventId: number
  latestEventType: string
  latestEventPrice: number
  latestEventQuantity: number | null
  latestEventMemo: string | null
  latestEventCreatedAt: string
}
/**
 * @description 일지 리스트 페이지 헤더 컴포넌트 타입
 * @param totalProfit 총 수익
 * @param avgReturn 평균 수익률
 * @param holdingCount 보유 종목 수
 */

export interface JournalHeaderProps {
  totalProfit: number
  avgReturn: number
  holdingCount: number
  baseCurrency?: string
  usdKrwRate?: number
}

/**
 * @description 일지 리스트 컴포넌트 타입
 * @param journals 일지 목록
 */
export interface JournalListProps {
  journals: JournalListItemProps[]
}

/**
 * @description 일지 항목 컴포넌트 타입
 * @param journal 일지 하나의 데이터
 * @param href 일지 상세 페이지 경로
 */
export interface JournalItemProps {
  journal: JournalListItemProps
  href: string
}

/**
 * @description 일지 상세 페이지에서 사용하는 감정 기록 항목 타입
 * @param date 감정 기록 일자
 * @param emotion 감정 이모지
 * @param emotionLabel 감정 라벨
 * @param price 감정 가격
 * @param memo 감정 메모
 * @param quantity 당시 구입한 수량
 */
export interface JournalDetailEmotionHistoryItemProps {
  date: string
  emotion: string
  emotionLabel: string
  price: number
  memo: string
  quantity?: number
}

/**
 * @description 감정 기록 타임라인 컴포넌트 타입
 * @param totalRecords 총 감정 기록 횟수
 * @param emotionHistory 감정 기록 배열
 * @param buyPrice 매수 가격 (가격 차이 계산용)
 */
export interface JournalDetailEmotionTimeLineProps {
  totalRecords: number
  emotionHistory: JournalDetailEventProps[]
  buyPrice: number
  symbol: string
}

/**
 * @description 일지 상세 페이지 요약 컴포넌트 타입
 * @param symbolName 종목 이름
 * @param currentPrice 현재 가격
 * @param returnRate 수익률
 * @param buyPrice 매수 가격
 * @param profit 수익
 * @param totalQuantity 보유 수량
 * @param buyDate 매수 일자
 */
export interface JournalDetailSummaryProps {
  symbol: string
  symbolName: string
  currentPrice: number
  returnRate: number
  buyPrice: number
  profit: number
  totalQuantity: number
  buyDate: string
}

export interface JournalFormProps {
  formData: JournalCreateFormData
  setFormData: React.Dispatch<React.SetStateAction<JournalCreateFormData>>
  selectedEmotion: string | null
  setSelectedEmotion: React.Dispatch<React.SetStateAction<string | null>>
}

/**
 * @description 일지 생성 폼 데이터
 * HTML input의 value는 항상 string이므로 string 타입 사용
 * emotionId는 폼 상태로 관리하지 않고 selectedEmotion으로 별도 관리
 * @param symbol 종목 심볼
 * @param symbolName 종목 이름
 * @param price 매수 가격
 * @param quantity 수량
 * @param memo 메모
 */
export interface JournalCreateFormData {
  symbol: string
  symbolName: string
  price: string
  quantity: string
  memo: string
}

/**
 * @description 감정 추가 폼 데이터
 * @param price 현재 시세 (선택, 없으면 자동 조회)
 * @param quantity 추가 매수 수량 (선택)
 * @param memo 감정 메모 (선택)
 */
export interface EmotionAddFormData {
  price: string
  quantity: string
  memo: string
}

/**
 * @description 감정 추가 API 요청 데이터
 * @param emotionId 감정 타입 (필수)
 * @param price 현재 시세 (선택, quantity가 있으면 필수)
 * @param quantity 추가 매수 수량 (선택)
 * @param memo 감정 메모 (선택)
 */
export interface EmotionAddRequest {
  emotionId: EmotionType
  price?: number
  quantity?: number
  memo?: string
}

/**---------------------------------------------------- */

export interface JournalDetailItemProps {
  id: number
  symbol: string
  symbolName: string
  status: 'OPEN' | 'CLOSED'

  buyDate: string
  buyPrice: number
  initialQuantity: number

  totalQuantity: number
  totalCost: number
  averageCost: number
}

export interface JournalDetailMetricsProps {
  currentPrice: number
  profit: number
  profitPercentage: number
  realizedProfit: number
}

export interface JournalDetailEventProps {
  id: number
  type: 'BUY' | 'SELL' | 'NOTE' | 'EMOTION'
  price: number
  quantity?: number
  memo?: string
  emotions: Array<{
    code: string
    label: string
  }>
  createdAt: string
}

export interface JournalDetailResponse {
  journal: JournalDetailItemProps
  metrics: JournalDetailMetricsProps
  events: JournalDetailEventProps[]
}
