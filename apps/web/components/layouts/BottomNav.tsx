'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { useSyncExternalStore } from 'react'

function useIsHydrated() {
  // 서버 렌더에서는 false, 클라이언트에서는 true가 되도록 보장
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

const NAV_ITEMS = [
  {
    label: '홈',
    href: ROUTES.JOURNAL.LIST,
    icon: '🏠',
  },
  {
    label: '일지 작성',
    href: ROUTES.JOURNAL.CREATE,
    icon: '✏️',
    primary: true,
  },
  {
    label: '리포트',
    href: ROUTES.REPORT.SUMMARY,
    icon: '📊',
  },
  {
    label: '설정',
    href: ROUTES.SETTINGS,
    icon: '⚙️',
  },
]

/**
 * 하단 네비게이션 (모바일)

 */
export function BottomNav() {
  /**
   * SSR로 렌더된 HTML과 클라이언트 첫 렌더 결과가 달라지면 hydration mismatch가 발생할 수 있음.
   * (예: 최초 로드 직후 클라이언트 리다이렉트로 pathname이 바뀌는 경우)
   * 안전하게 mount 이후에만 하단 네비를 렌더링한다.
   */
  const isHydrated = useIsHydrated()

  const pathname = usePathname()

  if (!isHydrated) return null

  const isCreatePage = pathname === ROUTES.JOURNAL.CREATE
  // /journal/숫자 형식이면 상세 페이지 (create 제외)
  const isJournalDetail =
    pathname.startsWith('/journal/') &&
    pathname !== ROUTES.JOURNAL.LIST &&
    pathname !== ROUTES.JOURNAL.CREATE
  const isReportDetail = pathname.startsWith('/report/') && pathname !== ROUTES.REPORT.SUMMARY
  const isHome = pathname === '/'

  if (isCreatePage || isJournalDetail || isReportDetail || isHome) {
    return null
  }

  return (
    <nav className="safe-area-bottom fixed right-0 bottom-0 left-0 z-40 mx-auto max-w-[480px] border-t border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-around px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href

          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="relative -mt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#F2F4F6] bg-[#3182F6] text-2xl shadow-[0_8px_16px_rgba(49,130,246,0.4)] transition-transform active:scale-95">
                  {item.icon}
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors',
                isActive ? 'text-[#191F28]' : 'text-[#B0B8C1] hover:text-[#4E5968]'
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
