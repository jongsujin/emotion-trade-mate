import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getMe } from '.'
import { UserInfo } from '@/types/auth'

export function useGetMe(): UseQueryResult<UserInfo, Error> {
  return useQuery<UserInfo, Error>({
    queryKey: ['me'],
    queryFn: () => getMe().then((res) => res.data as UserInfo),
  })
}
