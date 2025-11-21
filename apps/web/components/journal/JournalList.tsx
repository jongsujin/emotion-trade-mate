import { JournalListProps } from '@/types/journals'
import JournalItem from './JournalItem'
import { ROUTES } from '@/constants'

/**
 * 일지 리스트 컴포넌트
 */
export default function JournalList({ journals }: JournalListProps) {
  return (
    <section className="px-5 pb-24">
      {/* 필터 칩 (가로 스크롤) - 투자 복기 요소 */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
        {['전체', '수익중', '손실중', '😍 행복', '😨 불안'].map((filter, idx) => (
          <button
            key={filter}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              idx === 0
                ? 'bg-[#191F28] text-white border border-[#191F28]'
                : 'bg-white text-[#4E5968] border border-[#E5E8EB] active:bg-[#F2F4F6]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {journals.map((journal) => (
          <JournalItem key={journal.id} journal={journal} href={ROUTES.JOURNAL.DETAIL(journal.id)} />
        ))}
      </div>
    </section>
  )
}
