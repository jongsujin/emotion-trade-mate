import Link from 'next/link'
import { EMOTION_DATA, EmotionType } from '@/constants/emotions'
import { formatPercent, formatProfitWithSymbol } from '@/lib/utils'
import { JournalItemProps } from '@/types/journals'

export default function JournalItem({ journal, href }: JournalItemProps) {
  const emotionConfig = EMOTION_DATA[journal.primaryEmotion as EmotionType]
  const emoji = emotionConfig?.emoji || '😶'
  const label = emotionConfig?.label || journal.primaryEmotionLabel || '기타'

  const isProfit = journal.realizedProfit >= 0
  const timeLabel = new Date(journal.latestEventCreatedAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const memo = journal.latestEventMemo?.trim() || '기록된 메모가 없습니다.'
  const positionLabel = journal.totalQuantity > 0 ? '보유중' : '종료'
  const realizedReturnRate =
    journal.totalCost > 0 ? (journal.realizedProfit / journal.totalCost) * 100 : 0

  return (
    <Link href={href} className="block">
      <article className="rounded-2xl border border-[#f1f5f9] bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-transform active:scale-[0.99]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] text-lg">
              <span aria-label={label}>{emoji}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold leading-none text-[#0f172a]">{journal.symbol}</h3>
              <p className="mt-1 text-xs font-medium text-[#64748b]">
                {journal.totalQuantity}주 · {positionLabel}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className={`text-lg font-bold ${isProfit ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
              {formatProfitWithSymbol(journal.realizedProfit, journal.symbol, { withPlus: true })}
            </p>
            <p className={`text-xs font-medium ${isProfit ? 'text-[#059669b3]' : 'text-[#e11d48b3]'}`}>
              {formatPercent(realizedReturnRate, { withSign: true, maximumFractionDigits: 1 })}
            </p>
          </div>
        </div>

        <p className="mt-4 max-h-[4.5rem] overflow-hidden text-sm leading-6 text-[#475569]">{memo}</p>

        <div className="mt-4 flex items-center justify-between border-t border-[#f8fafc] pt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(103,204,244,0.1)] px-3 py-1 text-xs font-semibold text-[#67ccf4]">
            <span>{emoji}</span>
            <span>{label}</span>
          </span>

          <span className="text-xs font-medium text-[#94a3b8]">{timeLabel}</span>
        </div>
      </article>
    </Link>
  )
}
