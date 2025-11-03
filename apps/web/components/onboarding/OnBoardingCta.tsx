import { ROUTES } from '@/constants'
import Link from 'next/link'
import { Button } from '../common'

export default function OnBoardingCta() {
  return (
    <div className="space-y-3">
      <Link href={ROUTES.JOURNAL.CREATE} className="block">
        <Button variant="primary" size="lg" fullWidth>
          시작하기
        </Button>
      </Link>
      <p className="text-center text-xs text-gray-500">무료로 시작 • 언제든 취소 가능</p>
    </div>
  )
}
