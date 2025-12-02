import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { UserInfo } from '@/types/auth'
import { getMe } from './api'

export function useGetMe(): UseQueryResult<UserInfo, Error> {
  return useQuery<UserInfo, Error>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await getMe()

      // ApiResponse에서 데이터 추출
      if (!response.success || !response.data) {
        throw new Error(response.error || '사용자 정보를 불러올 수 없습니다')
      }

      return response.data
    },
    retry: false, // 인증 실패 시 재시도 안 함
    staleTime: 5 * 60 * 1000, // 5분
  })
}
