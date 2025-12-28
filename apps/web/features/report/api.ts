import { useQuery } from '@tanstack/react-query'
import { apiClient as client } from '@/lib/api/client'
import type { ReportResponse } from './types'
import type { ApiResponse } from '@/types'

const getEmotionPerformance = async (): Promise<ApiResponse<ReportResponse>> => {
  return await client.get<ReportResponse>('/reports/emotions/performance')
}

export const useGetEmotionPerformance = () => {
  return useQuery({
    queryKey: ['reports', 'emotions', 'performance'],
    queryFn: getEmotionPerformance,
  })
}
