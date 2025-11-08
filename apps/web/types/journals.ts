import type { EmotionType } from '@/constants/emotions'
import { EmotionHistoryResponse } from './emotion'

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
}

/**
 * @description 일지 리스트 컴포넌트 타입
 * @param journals 일지 목록
 */
export interface JournalListProps {
  journals: JournalItemData[]
}

/**
 * @description 일지 항목 컴포넌트 타입
 * @param journal 일지 하나의 데이터
 * @param href 일지 상세 페이지 경로
 */
export interface JournalItemProps {
  journal: JournalItemData
  href: string
}
/**
 * 일지 항목 데이터 (서버에서 받는 데이터)
 * 모든 숫자 필드는 number 타입 사용
 */
export interface JournalItemData {
  id: number // 일지 고유 아이디
  symbol: string // 종목 심볼
  symbolName: string // 종목 이름
  emoji: string // 이모지
  emotionLabel: string // 감정 라벨
  emotionCount: number // 감정 횟수
  returnRate: number // 수익률
  currentPrice: number // 현재 가격
  buyPrice: number // 매수 가격
  buyDate: string // 매수 일자
  quantity: number // 수량
}

/**
 * @description 일지 상세 페이지 컴포넌트 타입
 * @param id 일지 고유 아이디
 * @param symbol 종목 심볼
 * @param symbolName 종목 이름
 * @param buyDate 매수 일자
 * @param buyPrice 매수 가격
 * @param currentPrice 현재 가격
 * @param totalQuantity 보유 수량
 * @param returnRate 수익률
 * @param profit 수익
 * @param totalRecords 감정 횟수
 * @param emotionHistory 감정 기록
 */
export interface JournalDetailItemProps {
  id: number
  symbol: string
  symbolName: string
  buyDate: string
  buyPrice: number
  currentPrice: number
  totalQuantity: number
  returnRate: number
  profit: number
  totalRecords: number
  emotionHistory: JournalDetailEmotionHistoryItemProps[]
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
  emotionHistory: JournalDetailEmotionHistoryItemProps[]
  buyPrice: number
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
  selectedEmotion: EmotionType | null
  setSelectedEmotion: React.Dispatch<React.SetStateAction<EmotionType | null>>
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
 * @description 일지 생성 API 요청 데이터
 * 서버로 보낼 때는 number 타입으로 변환
 * emotionId는 EmotionType을 사용
 * @param symbol 종목 심볼
 * @param symbolName 종목 이름
 * @param buyPrice 매수 가격
 * @param quantity 수량
 * @param emotionId 감정 타입
 * @param memo 메모
 * @param buyDate 매수 일자
 */
export interface JournalCreateRequest {
  symbol: string
  symbolName?: string
  buyPrice: number // string -> number 변환 필요
  quantity: number // string -> number 변환 필요
  emotionId: EmotionType // EmotionType 사용 (현재는 union type, 추후 enum으로 확장 가능)
  memo?: string
  buyDate: string // ISO 형식: "2024-01-15"
}

/**
 * @description 폼 데이터를 API 요청 데이터로 변환하는 헬퍼 함수의 반환 타입
 * @param formData 일지 생성 폼 데이터
 * @param emotionId 감정 타입
 * @returns 일지 생성 API 요청 데이터
 */
export type JournalCreateFormToRequest = (
  formData: JournalCreateFormData,
  emotionId: EmotionType
) => JournalCreateRequest

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

export interface JournalListResponse {
  id: number
  symbol: string
  symbolName: string
  journalCount: number
  currentPrice: number
  profit: number
  profitPercentage: number
}

export interface JournalCreateRequest {
  symbol: string
  buyPrice: number
  quantity: number
  emotionId: EmotionType
  memo?: string
  buyDate: string
}

export interface JournalUpdateRequest extends JournalCreateRequest {
  id: number
}

export interface JournalDetailResponse {
  id: number
  symbol: string
  symbolName: string
  buyDate: string
  buyPrice: number
  initialQuantity: number
  averageCost: number
  totalCost: number
  currentPrice: number
  totalQuantity: number
  profitPercentage: number
  profit: number
  emotionList: EmotionHistoryResponse[]
}
