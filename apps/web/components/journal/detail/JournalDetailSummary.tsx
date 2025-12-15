import { formatNumber } from '@/lib/utils'
import { JournalDetailSummaryProps } from '@/types/journals'

export default function JournalDetailSummary({
  symbolName,
  currentPrice,
  returnRate,
  buyPrice,
  profit,
  totalQuantity,
  buyDate,
}: JournalDetailSummaryProps) {
  const isProfit = returnRate >= 0
  const profitColor = isProfit ? 'text-[#FF6B6B]' : 'text-[#6C9EFF]'

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-[#6B7280]">{symbolName}</p>
          <h2 className="text-3xl font-bold text-[#191F28]">₩{currentPrice.toLocaleString()}</h2>
        </div>
        <span className={`text-lg font-bold ${profitColor}`}>
          {isProfit ? '+' : ''}
          {returnRate}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <p className="mb-1 text-xs font-medium text-[#9CA3AF]">총 평가 손익</p>
          <p className={`text-base font-bold ${profitColor}`}>
            {isProfit ? '+' : ''}
            {formatNumber(profit)}원
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-[#9CA3AF]">평단가</p>
          <p className="text-base font-bold text-[#374151]">₩{buyPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-[#9CA3AF]">보유 수량</p>
          <p className="text-base font-bold text-[#374151]">{totalQuantity}주</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-[#9CA3AF]">최초 매수일</p>
          <p className="text-base font-bold text-[#374151]">{buyDate}</p>
        </div>
      </div>
    </div>
  )
}
