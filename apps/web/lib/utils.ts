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
  const sign = rate >= 0 ? '+' : ''
  return `${sign}${rate.toFixed(2)}%`
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
