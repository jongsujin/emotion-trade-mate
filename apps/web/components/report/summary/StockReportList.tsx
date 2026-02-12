import Link from 'next/link'
import { ROUTES } from '@/constants'

export interface StockReportListProps {
  items: Array<{
    id: number
    symbol: string
  }>
}

export default function StockReportList({ items }: StockReportListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-4">
        <h3 className="text-base font-semibold text-gray-900">종목별 상세 리포트</h3>
        <p className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
          아직 상세 리포트를 만들 데이터가 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">종목별 상세 리포트</h3>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <Link key={item.id} href={ROUTES.REPORT.DETAIL(String(item.id))}>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 active:bg-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📊</span>
                <p className="font-medium text-gray-900">{item.symbol}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
