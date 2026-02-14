import Link from 'next/link'
import { Filter, Search, Sparkles, TrendingUp } from 'lucide-react'
import { ROUTES } from '@/constants'
import { JournalHeaderProps } from '@/types/journals'
import { formatDecimal, formatKrwAmount } from '@/lib/utils'

export default function JournalHeader({
  totalProfit,
  avgReturn,
  holdingCount,
  baseCurrency = 'KRW',
  usdKrwRate,
}: JournalHeaderProps) {
  const safeTotalProfit = Number.isFinite(totalProfit) ? totalProfit : 0
  const safeAvgReturn = Number.isFinite(avgReturn) ? avgReturn : 0
  const isPositive = safeTotalProfit >= 0

  const moodLabel = safeAvgReturn >= 3 ? '낙관적' : safeAvgReturn >= 0 ? '중립적' : '주의 필요'

  return (
    <section className="border-b border-[#f1f5f9] bg-white px-5 pb-4 pt-12 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#0f172a]">내 저널</h1>
          <p className="mt-1 text-xs font-medium text-[#64748b]">거래와 감정을 함께 기록하세요</p>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748b] transition-colors hover:bg-[#f8fafc]">
            <Search className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748b] transition-colors hover:bg-[#f8fafc]">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-[rgba(103,204,244,0.22)] bg-[rgba(103,204,244,0.1)] px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(103,204,244,0.2)]">
            <TrendingUp className="h-4 w-4 text-[#67ccf4]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.06em] text-[#64748b] uppercase">순손익</p>
            <p className="text-sm font-bold text-[#0f172a]">
              {isPositive ? '+' : ''}
              {formatKrwAmount(safeTotalProfit)}원
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] bg-white px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffedd5]">
            <Sparkles className="h-4 w-4 text-[#f97316]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.06em] text-[#64748b] uppercase">감정 흐름</p>
            <p className="text-sm font-bold text-[#0f172a]">{moodLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs text-[#94a3b8]">
            보유 종목 {holdingCount}개 · 평균 {formatDecimal(safeAvgReturn, { maximumFractionDigits: 2 })}%
          </p>
          <p className="text-[11px] text-[#94a3b8]">
            기준통화: {baseCurrency}
            {usdKrwRate ? ` · 1 USD = ${formatDecimal(usdKrwRate, { maximumFractionDigits: 2 })} KRW` : ''}
          </p>
        </div>
        <Link
          href={ROUTES.JOURNAL.CREATE}
          className="text-xs font-semibold text-[#67ccf4] transition-opacity hover:opacity-80"
        >
          새 기록 추가
        </Link>
      </div>
    </section>
  )
}
