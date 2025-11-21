import { JournalItemProps } from '@/types/journals'
import Link from 'next/link'

/**
 * 개별 일지 항목 컴포넌트
 */
export default function JournalItem({ journal, href }: JournalItemProps) {
  const isProfit = journal.returnRate >= 0
  
  // 토스 스타일: 가격 정보는 심플하게, 수익률은 명확하게
  return (
    <Link href={href} className="block">
      <div className="group relative overflow-hidden rounded-3xl bg-white p-5 transition-all duration-200 active:scale-[0.98] active:bg-[#F9FAFB]">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 종목 정보 */}
          <div className="flex items-center gap-4">
            {/* 이모지 아이콘 */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2F4F6]">
              <span className="text-2xl" role="img" aria-label={`감정: ${journal.emoji}`}>
                {journal.emoji}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] font-bold text-[#191F28]">{journal.symbol}</span>
                <span className="rounded-full bg-[#F2F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#8B95A1]">
                  {journal.emotionCount}회 기록
                </span>
              </div>
              <p className="mt-0.5 truncate text-sm text-[#8B95A1]">{journal.symbolName}</p>
            </div>
          </div>

          {/* 오른쪽: 수익률 */}
          <div className="ml-4 shrink-0 text-right">
            <p className="text-sm font-medium text-[#333D4B] mb-0.5">
              {journal.currentPrice.toLocaleString()}원
            </p>
            <div className={`text-base font-bold ${isProfit ? 'text-[#E42939]' : 'text-[#3182F6]'}`}>
              {isProfit ? '+' : ''}{journal.returnRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
