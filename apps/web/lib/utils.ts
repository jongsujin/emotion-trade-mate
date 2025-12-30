import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * 숫자 포맷팅
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num)
}

const LOCALE_KO_KR = 'ko-KR'
const LOCALE_EN_US = 'en-US'
const DEFAULT_PRICE_MAX_FRACTION_DIGITS = 2
const KRW_AMOUNT_MAX_FRACTION_DIGITS = 0
const DEFAULT_PERCENT_MAX_FRACTION_DIGITS = 2

export type CurrencyCode = 'KRW' | 'USD'

type FormatDecimalOptions = {
  maximumFractionDigits?: number
  minimumFractionDigits?: number
}

/**
 * 심볼로 통화 추론 (빠른 임시 정책)
 * - KRX: 6자리 숫자(005930) 또는 .KS/.KQ로 끝나는 심볼(005930.KS)
 * - 그 외(예: TSLA, AAPL): USD로 간주
 *
 * 정석: 백엔드에서 quote.currency를 함께 내려주고 프론트는 그대로 사용
 */
export function inferCurrencyFromSymbol(symbol: string): CurrencyCode {
  const normalized = symbol.trim().toUpperCase()
  if (!normalized) return 'KRW'

  const isKoreanSymbol =
    /^\d{6}$/.test(normalized) ||
    /^\d{6}\.(KS|KQ)$/.test(normalized) ||
    normalized.endsWith('.KS') ||
    normalized.endsWith('.KQ')

  return isKoreanSymbol ? 'KRW' : 'USD'
}

/**
 * 소수점 자릿수 제한이 필요한 숫자 포맷팅(천단위 구분 + 자릿수 제어)
 */
export function formatDecimal(value: number, options: FormatDecimalOptions = {}): string {
  if (!Number.isFinite(value)) return '-'

  const { maximumFractionDigits = DEFAULT_PRICE_MAX_FRACTION_DIGITS, minimumFractionDigits = 0 } =
    options

  return new Intl.NumberFormat(LOCALE_KO_KR, {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value)
}

/**
 * 가격 포맷팅 (기본: 소수점 최대 2자리)
 */
export function formatPrice(value: number, options: FormatDecimalOptions = {}): string {
  return formatDecimal(value, {
    maximumFractionDigits: DEFAULT_PRICE_MAX_FRACTION_DIGITS,
    ...options,
  })
}

type FormatMoneyOptions = {
  maximumFractionDigits?: number
  minimumFractionDigits?: number
}

function getDefaultMoneyDigits(currency: CurrencyCode) {
  if (currency === 'KRW') {
    return { maximumFractionDigits: 0, minimumFractionDigits: 0 }
  }
  return { maximumFractionDigits: 2, minimumFractionDigits: 2 }
}

function getMoneyLocale(currency: CurrencyCode) {
  return currency === 'USD' ? LOCALE_EN_US : LOCALE_KO_KR
}

/**
 * 통화 포맷팅 (₩ / $ 포함)
 */
export function formatMoney(
  value: number,
  currency: CurrencyCode,
  options: FormatMoneyOptions = {}
) {
  if (!Number.isFinite(value)) return '-'

  const defaults = getDefaultMoneyDigits(currency)
  const {
    maximumFractionDigits = defaults.maximumFractionDigits,
    minimumFractionDigits = defaults.minimumFractionDigits,
  } = options

  return new Intl.NumberFormat(getMoneyLocale(currency), {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value)
}

/**
 * 통화 포맷팅(부호 제어)
 * - withPlus: true면 양수에 + 표시
 */
export function formatSignedMoney(
  value: number,
  currency: CurrencyCode,
  options: FormatMoneyOptions & { withPlus?: boolean } = {}
) {
  if (!Number.isFinite(value)) return '-'

  const { withPlus = false, ...rest } = options

  if (value > 0) return `${withPlus ? '+' : ''}${formatMoney(value, currency, rest)}`
  if (value < 0) return `-${formatMoney(Math.abs(value), currency, rest)}`
  return formatMoney(0, currency, rest)
}

/**
 * 가격(현재가/평단가 등) 포맷팅
 * - USD: 소수점 2자리 고정(485.40)
 * - KRW: 소수점 0자리(₩12,345)
 */
export function formatPriceWithSymbol(value: number, symbol: string) {
  const currency = inferCurrencyFromSymbol(symbol)
  return formatMoney(value, currency)
}

/**
 * 수익/손익 금액 포맷팅
 * - USD: 소수점 2자리
 * - KRW: 소수점 0자리
 */
export function formatProfitWithSymbol(
  value: number,
  symbol: string,
  options: { withPlus?: boolean } = {}
) {
  const currency = inferCurrencyFromSymbol(symbol)
  return formatSignedMoney(value, currency, { withPlus: options.withPlus ?? false })
}

/**
 * 원화 금액 포맷팅 (기본: 소수점 0자리, 반올림)
 */
export function formatKrwAmount(value: number): string {
  if (!Number.isFinite(value)) return '-'
  return new Intl.NumberFormat(LOCALE_KO_KR, {
    maximumFractionDigits: KRW_AMOUNT_MAX_FRACTION_DIGITS,
  }).format(Math.round(value))
}

type FormatPercentOptions = {
  maximumFractionDigits?: number
  minimumFractionDigits?: number
  withSign?: boolean
}

/**
 * 퍼센트 포맷팅
 * - withSign: true면 양수에 + 붙임
 */
export function formatPercent(value: number, options: FormatPercentOptions = {}): string {
  if (!Number.isFinite(value)) return '-'

  const {
    maximumFractionDigits = DEFAULT_PERCENT_MAX_FRACTION_DIGITS,
    minimumFractionDigits = 0,
    withSign = false,
  } = options

  const sign = withSign && value > 0 ? '+' : ''
  return `${sign}${formatDecimal(value, { maximumFractionDigits, minimumFractionDigits })}%`
}

/**
 * @description 숫자 버림 처리
 */

/**
 * 수익률 계산
 */
export function calculateReturnRate(buyPrice: number, currentPrice: number): number {
  return ((currentPrice - buyPrice) / buyPrice) * 100
}

/**
 * 수익률 포맷팅 (+ 또는 - 기호 포함)
 */
export function formatReturnRate(rate: number): string {
  return formatPercent(rate, { maximumFractionDigits: 2, minimumFractionDigits: 0, withSign: true })
}

/**
 * 계좌번호 마스킹
 */
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length < 4) return accountNumber
  return accountNumber.slice(0, -4).replace(/./g, '*') + accountNumber.slice(-4)
}

/**
 * 플랫폼 감지
 */
export function isCapacitor(): boolean {
  return typeof window !== 'undefined' && 'Capacitor' in window
}

export function getPlatform(): 'web' | 'ios' | 'android' {
  if (typeof window === 'undefined') return 'web'

  if ('Capacitor' in window) {
    const platform = (
      window as { Capacitor: { getPlatform: () => 'ios' | 'android' } }
    ).Capacitor.getPlatform()
    return platform as 'ios' | 'android'
  }

  return 'web'
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 파일 크기 포맷팅
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
