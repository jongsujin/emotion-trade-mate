import { ROUTES } from '@/constants'
import { JournalHeaderProps } from '@/types/journals'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'

export default function JournalHeader({
  totalProfit,
  avgReturn,
  holdingCount,
}: JournalHeaderProps) {
  // 숫자 데이터 검증 및 기본값 설정
  const safeTotalProfit = typeof totalProfit === 'number' ? totalProfit : 0
  const safeAvgReturn = typeof avgReturn === 'number' ? avgReturn : 0

  // 간단한 감정 분석 메시지 (실제 데이터 연동 전 목업)
  const emotionMessage =
    safeTotalProfit >= 0
      ? '평온한 마음으로 투자를 잘하고 계시네요! 🌤️'
      : '조금 불안하신가요? AI 조언을 확인해보세요. ☂️'

  return (
    <section className="px-5 pt-6 pb-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#191F28]">내 투자</h1>
        <div className="flex gap-3">
          <Link
            href="/report/summary"
            className="flex items-center justify-center rounded-full bg-[#E5E8EB] px-3 py-1.5 text-xs font-semibold text-[#4E5968] transition-colors active:bg-[#D1D6DB]"
          >
            AI 분석
          </Link>
          <Link
            href={ROUTES.JOURNAL.CREATE}
            className="flex items-center justify-center text-base font-semibold text-[#3182F6] transition-opacity active:opacity-70"
          >
            추가
          </Link>
        </div>
      </div>

      {/* 총 수익 카드 */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <p className="mb-1 text-sm font-medium text-[#8B95A1]">총 평가 손익</p>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-3xl font-bold ${safeTotalProfit >= 0 ? 'text-[#E42939]' : 'text-[#3182F6]'}`}
          >
            {safeTotalProfit >= 0 ? '+' : ''}
            {formatNumber(Math.round(safeTotalProfit))}원
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div
            className={`rounded-md px-2 py-1 text-xs font-semibold ${safeAvgReturn >= 0 ? 'bg-[#FFF0F1] text-[#E42939]' : 'bg-[#F0F6FF] text-[#3182F6]'}`}
          >
            {safeAvgReturn >= 0 ? '▲' : '▼'} {Math.abs(safeAvgReturn).toFixed(2)}%
          </div>
          <span className="text-sm text-[#8B95A1]">{holdingCount}종목 보유</span>
        </div>

        {/* 감정 코멘트 (투자 복기 요소) */}
        <div className="mt-5 border-t border-gray-50 pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-[#4E5968]">
            💡 {emotionMessage}
          </p>
        </div>
      </div>
    </section>
  )
}
