'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * React Query Provider 컴포넌트
 * Client Component로 분리하여 Server Component에서 사용 가능
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 옵션 설정
            staleTime: 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분 (cacheTime 대신 gcTime)
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
