'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

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
 * 레퍼런스 앱 스타일 적용
 */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/80 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="relative -mt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-2xl shadow-elevated transition-transform active:scale-95">
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
                'flex flex-col items-center gap-1 py-2 px-3 transition-colors rounded-xl',
                isActive ? 'text-primary-600' : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
