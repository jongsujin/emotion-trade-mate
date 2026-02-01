import { apiClient } from '@/lib/api/client'
import type { ApiResponse } from '@/types'

export interface DashboardSummary {
  totalProfit: number
  tradeCount: number
  winRate: number
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
  return apiClient.get<DashboardData>('/reports/dashboard')
}
