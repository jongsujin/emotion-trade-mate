import { formatPercent, formatProfitWithSymbol } from '@/lib/utils'
import { ReportStockInfoProps } from '@/types/reports'

export default function ReportStockInfo({
  emoji,
  symbol,
  returnRate,
  profit,
  period,
  totalRecords,
  symbolName,
}: ReportStockInfoProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xl">{emoji}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">{symbol}</h2>
          <p className="text-sm text-gray-600">{symbolName}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-red-500">
            {formatPercent(returnRate, { withSign: true })}
          </div>
          <div className="text-sm text-gray-600">
            {formatProfitWithSymbol(profit, symbol, { withPlus: true })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
        <span className="text-gray-600">분석 기간</span>
        <span className="font-medium text-gray-900">{period}</span>
      </div>
      <div className="flex items-center justify-between pt-2 text-sm">
        <span className="text-gray-600">기록 횟수</span>
        <span className="font-medium text-gray-900">{totalRecords}회</span>
      </div>
    </div>
  )
}
