import { JournalListProps } from '@/types/journals'
import JournalItem from './JournalItem'
import { ROUTES } from '@/constants'

/**
 * 일지 리스트 컴포넌트
 * 여러 일지 항목을 렌더링하는 컨테이너
 */
export default function JournalList({ journals }: JournalListProps) {
  return (
    <section className="flex flex-col gap-2 space-y-2 px-4 pt-3 pb-24">
      {journals.map((journal) => (
        <JournalItem key={journal.id} journal={journal} href={ROUTES.JOURNAL.DETAIL(journal.id)} />
      ))}
    </section>
  )
}
