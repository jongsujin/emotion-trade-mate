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
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm text-gray-600">{symbolName}</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">
          ₩{currentPrice.toLocaleString()}
        </span>
        <span className={`text-base font-medium ${isProfit ? 'text-red-500' : 'text-blue-500'}`}>
          {isProfit ? '+' : ''}
          {returnRate}%
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-600">매수가</p>
          <p className="mt-1 text-sm font-medium text-gray-900">₩{buyPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">수익</p>
          <p className={`mt-1 text-sm font-bold ${isProfit ? 'text-red-500' : 'text-blue-500'}`}>
            {isProfit ? '+' : ''}
            {profit.toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">보유 수량</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{totalQuantity}주</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">매수일</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{buyDate}</p>
        </div>
      </div>
    </div>
  )
}
