import { JournalItemProps } from '@/types/journals'
import Link from 'next/link'

/**
 * 개별 일지 항목 컴포넌트
 * 종목 정보, 감정 기록 횟수, 수익률 표시
 */
export default function JournalItem({ journal, href, quantity = 10 }: JournalItemProps) {
  const isProfit = journal.returnRate >= 0
  const profit = (journal.currentPrice - journal.buyPrice) * quantity

  return (
    <Link href={href}>
      <div className="group rounded-2xl bg-white p-4 transition-colors active:bg-gray-50">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 종목 정보 */}
          <div className="flex items-center gap-3">
            {/* 이모지 */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl" role="img" aria-label={`감정: ${journal.emoji}`}>
                {journal.emoji}
              </span>
            </div>

            {/* 종목명 */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900">{journal.symbol}</span>
                <span className="text-xs text-gray-500">{journal.emotionCount}회</span>
              </div>
              <p className="mt-0.5 truncate text-sm text-gray-600">{journal.symbolName}</p>
            </div>
          </div>

          {/* 오른쪽: 수익률 */}
          <div className="ml-4 shrink-0 text-right">
            <div className={`text-lg font-bold ${isProfit ? 'text-red-500' : 'text-blue-500'}`}>
              {isProfit ? '+' : ''}
              {journal.returnRate.toFixed(2)}%
            </div>
            <p className="mt-0.5 text-sm text-gray-600">
              {profit >= 0 ? '+' : ''}
              {profit.toFixed(0)}원
            </p>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
          <span className="text-gray-500">현재가</span>
          <span className="font-medium text-gray-900">${journal.currentPrice.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  )
}
