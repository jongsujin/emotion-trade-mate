import Link from 'next/link'
import { ROUTES } from '@/constants'

export interface StockReportListProps {
  symbols: string[]
}

export default function StockReportList({ symbols }: StockReportListProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">종목별 상세 리포트</h3>

      <div className="mt-3 space-y-2">
        {symbols.map((symbol, idx) => (
          <Link key={idx} href={ROUTES.REPORT.DETAIL(String(idx + 1))}>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 active:bg-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📊</span>
                <p className="font-medium text-gray-900">{symbol}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

