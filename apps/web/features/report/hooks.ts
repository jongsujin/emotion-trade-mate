import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import type { ReportResponse } from './types'
import { getEmotionPerformance } from './api'

export function useGetEmotionPerformance(): UseQueryResult<ApiResponse<ReportResponse>, Error> {
  return useQuery({
    queryKey: ['report', 'emotion-performance'],
    queryFn: getEmotionPerformance,
  })
}
