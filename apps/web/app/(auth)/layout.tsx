'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BatteryFull, CandlestickChart, SignalHigh, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const isLogin = pathname === ROUTES.LOGIN

  return (
    <div className="min-h-screen bg-[#f6f7f8] px-4 py-3">
      <div className="relative mx-auto min-h-[750px] w-full max-w-[384px] overflow-hidden rounded-2xl border border-[#eceff3] bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 pt-3">
          <span className="text-xs font-semibold tracking-[0.12em] text-[#111827]">9:41</span>
          <div className="flex items-center gap-1.5 text-[#111827]">
            <SignalHigh className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <BatteryFull className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="px-8 pt-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(103,204,244,0.2)]">
              <CandlestickChart className="h-5 w-5 text-[#67ccf4]" />
            </div>
            <h1 className="text-[33px] font-bold leading-none tracking-[-0.02em] text-[#111827]">
              EmotionTrade
            </h1>
          </div>
        </div>

        <div className="px-8 pt-6">
          <div className="grid grid-cols-2 rounded-xl bg-[#f3f4f6] p-1">
            <Link
              href={ROUTES.LOGIN}
              className={cn(
                'rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
                isLogin ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-[#6b7280]'
              )}
            >
              로그인
            </Link>
            <Link
              href={ROUTES.SIGNUP}
              className={cn(
                'rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
                !isLogin ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-[#6b7280]'
              )}
            >
              회원가입
            </Link>
          </div>
        </div>

        <div className="px-8 pb-8 pt-8">{children}</div>

        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[rgba(103,204,244,0.08)] blur-[30px]" />
        <div className="pointer-events-none absolute -left-16 top-40 h-40 w-40 rounded-full bg-[rgba(103,204,244,0.1)] blur-[24px]" />
      </div>
    </div>
  )
}
