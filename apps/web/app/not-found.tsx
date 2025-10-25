import Link from 'next/link'
import { ROUTES } from '@/constants'

/**
 * 404 페이지
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">페이지를 찾을 수 없습니다</p>
        <p className="mt-2 text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href={ROUTES.HOME}
            className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href={ROUTES.JOURNAL.LIST}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 hover:bg-gray-50"
          >
            일지 목록
          </Link>
        </div>
      </div>
    </div>
  )
}
