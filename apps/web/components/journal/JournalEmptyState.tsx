import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ROUTES } from '@/constants'

export default function JournalEmptyState() {
  return (
    <section className="px-5 pb-24 pt-8">
      <div className="rounded-2xl border border-[#f1f5f9] bg-white px-6 py-10 text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
        <span className="text-5xl">📝</span>
        <h3 className="mt-4 text-lg font-bold text-[#0f172a]">아직 기록된 저널이 없어요</h3>
        <p className="mt-2 text-sm leading-6 text-[#64748b]">
          첫 거래와 감정을 함께 남기면
          <br />
          나만의 의사결정 패턴을 볼 수 있어요.
        </p>

        <Link
          href={ROUTES.JOURNAL.CREATE}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#67ccf4] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_15px_-3px_rgba(103,204,244,0.3),0_4px_6px_-4px_rgba(103,204,244,0.3)]"
        >
          <Plus className="h-4 w-4" />
          일지 작성 시작
        </Link>
      </div>
    </section>
  )
}
