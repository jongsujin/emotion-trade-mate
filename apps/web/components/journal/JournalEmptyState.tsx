import { ROUTES } from '@/constants'
import Link from 'next/link'

export default function JournalEmptyState() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <span className="text-5xl">📝</span>
        <p className="mt-4 text-base font-semibold text-gray-900">아직 기록이 없어요</p>
        <p className="mt-2 text-sm text-gray-600">첫 투자 감정을 기록해보세요</p>
        <Link href={ROUTES.JOURNAL.CREATE}>
          <button className="bg-primary-500 active:bg-primary-600 mt-6 rounded-xl px-8 py-3.5 text-base font-semibold text-white">
            감정 일지 작성하기
          </button>
        </Link>
      </div>
    </section>
  )
}
