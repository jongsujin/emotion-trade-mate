import { apiClient } from '@/lib/api/client'
import type { ApiResponse } from '@/types'
import { API_ROUTES } from '@/constants'
import type { ReportResponse } from './types'

export interface DashboardSummary {
  totalProfit: number
  tradeCount: number
  winRate: number
  realizedProfit: number
  unrealizedProfit: number
  totalCost: number
}

export interface RecentPnl {
  date: string
  profit: number
}

export interface TodayEmotion {
  code: string
  label: string
}

export interface DashboardData {
  summary: DashboardSummary
  recentTrend: RecentPnl[]
  todayEmotion: TodayEmotion | null
}

/**
 * 대시보드 데이터 조회
 */
export async function getDashboardData(): Promise<ApiResponse<DashboardData>> {
  return apiClient.get<DashboardData>(API_ROUTES.REPORT.DASHBOARD)
}

/**
 * 감정 성과 리포트 조회
 */
export async function getEmotionPerformance(): Promise<ApiResponse<ReportResponse>> {
  return apiClient.get<ReportResponse>(API_ROUTES.REPORT.EMOTION_PERFORMANCE)
}
