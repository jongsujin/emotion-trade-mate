export interface ProfitSummaryProps {
  period: string
  totalProfit: number
  avgReturnRate: number
  totalRecords: number
  totalSymbols: number
}

export default function ProfitSummary({
  period,
  totalProfit,
  avgReturnRate,
  totalRecords,
  totalSymbols,
}: ProfitSummaryProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">{period} 총 수익</p>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-red-500">+{totalProfit.toLocaleString()}</span>
          <span className="text-lg text-gray-500">원</span>
        </div>
        <div className="mt-2 text-base font-medium text-red-500">+{avgReturnRate}%</div>
      </div>

      {/* 통계 그리드 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xs text-gray-600">기록 횟수</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalRecords}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xs text-gray-600">거래 종목</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalSymbols}</p>
        </div>
      </div>
    </div>
  )
}
