import { ROUTES } from '@/constants'
import Link from 'next/link'

export default function JournalEmptyState() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="text-center">
        <span className="text-6xl">📝</span>
        <h3 className="mt-6 text-xl font-bold text-[#191F28]">아직 기록이 없어요</h3>
        <p className="mt-2 text-[#6B7684]">첫 투자 감정을 기록하고<br/>나만의 투자 패턴을 찾아보세요</p>
        <Link href={ROUTES.JOURNAL.CREATE}>
          <button className="mt-8 w-full min-w-[200px] rounded-xl bg-[#3182F6] px-6 py-4 text-base font-bold text-white transition-colors hover:bg-[#1B64DA] active:bg-[#1B64DA]">
            감정 일지 시작하기
          </button>
        </Link>
      </div>
    </section>
  )
}
