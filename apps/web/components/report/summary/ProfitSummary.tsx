import { formatNumber } from '@/lib/utils'
import type { ReportSummaryProps } from '@/types/reports'

export default function ProfitSummary({
  period,
  totalProfit,
  avgReturnRate,
  totalRecords,
  totalSymbols,
}: ReportSummaryProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="text-center">
        <span className="inline-block rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-medium text-[#6B7280]">
          {period}
        </span>
        <p className="mt-3 text-sm text-[#9CA3AF]">총 평가 손익</p>
        <div className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-[#FF6B6B]">+{formatNumber(totalProfit)}</span>
          <span className="text-lg font-medium text-[#9CA3AF]">원</span>
        </div>
        <div className="mt-2 text-base font-semibold text-[#FF6B6B]">+{avgReturnRate}%</div>
      </div>

      {/* 통계 그리드 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F9FAFB] p-4 text-center">
          <p className="text-xs font-medium text-[#6B7280]">기록 횟수</p>
          <p className="mt-1 text-xl font-bold text-[#374151]">{totalRecords}회</p>
        </div>
        <div className="rounded-2xl bg-[#F9FAFB] p-4 text-center">
          <p className="text-xs font-medium text-[#6B7280]">거래 종목</p>
          <p className="mt-1 text-xl font-bold text-[#374151]">{totalSymbols}개</p>
        </div>
      </div>
    </div>
  )
}
