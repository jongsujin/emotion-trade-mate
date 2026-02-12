import { JournalListProps } from '@/types/journals'
import JournalItem from './JournalItem'
import { ROUTES } from '@/constants'

function isSameDay(date: Date, target: Date) {
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  )
}

export default function JournalList({ journals }: JournalListProps) {
  const today = new Date()

  const grouped = journals.reduce(
    (acc, journal) => {
      const eventDate = new Date(journal.latestEventCreatedAt)
      if (isSameDay(eventDate, today)) {
        acc.today.push(journal)
      } else {
        acc.previous.push(journal)
      }
      return acc
    },
    {
      today: [] as JournalListProps['journals'],
      previous: [] as JournalListProps['journals'],
    }
  )

  return (
    <section className="space-y-5 px-5 pb-24 pt-6">
      {grouped.today.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-bold tracking-[0.12em] text-[#94a3b8] uppercase">오늘</h2>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>
          <div className="space-y-3">
            {grouped.today.map((journal) => (
              <JournalItem
                key={journal.id}
                journal={journal}
                href={ROUTES.JOURNAL.DETAIL(journal.id)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {grouped.previous.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-bold tracking-[0.12em] text-[#94a3b8] uppercase">이전</h2>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>
          <div className="space-y-3">
            {grouped.previous.map((journal) => (
              <JournalItem
                key={journal.id}
                journal={journal}
                href={ROUTES.JOURNAL.DETAIL(journal.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
