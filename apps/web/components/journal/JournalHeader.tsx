import { JournalHeaderProps } from '@/types/journals'
import Link from 'next/link'

export default function JournalHeader({
  href,
  totalProfit,
  avgReturn,
  holdingCount,
}: JournalHeaderProps) {
  return (
    <section className="mx-4 rounded-2xl bg-white px-4 pt-3 pb-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">투자</h1>
        <Link
          href={href}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <span className="text-lg">+</span>
        </Link>
      </div>

      {/* 총 수익 */}
      <div className="mt-6">
        <p className="text-xs text-gray-600">총 수익</p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span
            className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-gray-900' : 'text-red-500'}`}
          >
            {totalProfit >= 0 ? '+' : ''}
            {totalProfit.toFixed(0)}
          </span>
          <span className="text-base text-gray-500">원</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm">
          <span className={`font-medium ${avgReturn >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
            {avgReturn >= 0 ? '+' : ''}
            {avgReturn.toFixed(2)}%
          </span>
          <span className="text-gray-500">{holdingCount}개 보유</span>
        </div>
      </div>
    </section>
  )
}
