'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Home, LineChart, Plus, Settings } from 'lucide-react'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    label: '홈',
    href: ROUTES.DASHBOARD,
    icon: Home,
  },
  {
    label: '저널',
    href: ROUTES.JOURNAL.LIST,
    icon: BookOpen,
  },
  {
    label: '분석',
    href: ROUTES.REPORT.INDEX,
    icon: LineChart,
  },
  {
    label: '설정',
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
] as const

export function BottomNav() {
  const pathname = usePathname()

  const isCreatePage = pathname === ROUTES.JOURNAL.CREATE
  const isJournalDetail =
    pathname.startsWith('/journal/') &&
    pathname !== ROUTES.JOURNAL.LIST &&
    pathname !== ROUTES.JOURNAL.CREATE
  const isReportDetail = pathname.startsWith('/report/') && pathname !== ROUTES.REPORT.INDEX
  const isHome = pathname === '/'

  if (isCreatePage || isJournalDetail || isReportDetail || isHome) {
    return null
  }

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 mx-auto w-full max-w-[480px]">
      <div className="relative h-[82px] border-t border-[#f1f5f9] bg-white">
        <div className="grid h-full grid-cols-5 items-end px-4 pb-2">
          <NavItem item={NAV_ITEMS[0]} isActive={pathname === NAV_ITEMS[0].href} />
          <NavItem item={NAV_ITEMS[1]} isActive={pathname.startsWith('/journal')} />
          <div />
          <NavItem item={NAV_ITEMS[2]} isActive={pathname.startsWith('/report')} />
          <NavItem item={NAV_ITEMS[3]} isActive={pathname === NAV_ITEMS[3].href} />
        </div>

        <Link
          href={ROUTES.JOURNAL.CREATE}
          className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f6f7f8] bg-[#67ccf4] text-white shadow-[0_10px_15px_-3px_rgba(103,204,244,0.4),0_4px_6px_-4px_rgba(103,204,244,0.4)] transition-transform active:scale-95"
          aria-label="기록 추가"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  )
}

function NavItem({
  item,
  isActive,
}: {
  item: (typeof NAV_ITEMS)[number]
  isActive: boolean
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        'flex flex-col items-center justify-end gap-0.5 pb-1',
        isActive ? 'text-[#67ccf4]' : 'text-[#9ca3af]'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
    </Link>
  )
}
