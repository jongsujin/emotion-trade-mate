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
      <div className="flex justify-between items-start mb-6">
        <div>
            <p className="text-sm font-medium text-[#6B7280] mb-1">{symbolName}</p>
            <h2 className="text-3xl font-bold text-[#191F28]">₩{currentPrice.toLocaleString()}</h2>
        </div>
        <span className={`text-lg font-bold ${profitColor}`}>
          {isProfit ? '+' : ''}{returnRate}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <p className="text-xs font-medium text-[#9CA3AF] mb-1">총 평가 손익</p>
          <p className={`text-base font-bold ${profitColor}`}>
            {isProfit ? '+' : ''}{profit.toLocaleString()}원
          </p>
        </div>
        <div>
            <p className="text-xs font-medium text-[#9CA3AF] mb-1">평단가</p>
            <p className="text-base font-bold text-[#374151]">₩{buyPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#9CA3AF] mb-1">보유 수량</p>
          <p className="text-base font-bold text-[#374151]">{totalQuantity}주</p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#9CA3AF] mb-1">최초 매수일</p>
          <p className="text-base font-bold text-[#374151]">{buyDate}</p>
        </div>
      </div>
    </div>
  )
}
