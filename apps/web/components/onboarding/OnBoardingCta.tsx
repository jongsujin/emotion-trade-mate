import { ROUTES } from '@/constants'
import Link from 'next/link'
import { Button } from '../common'

export default function OnBoardingCta() {
  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 bg-linear-to-t from-[#F2F4F6] via-[#F2F4F6] to-transparent pt-12 pb-8">
      <div className="pointer-events-auto mx-auto max-w-[480px] px-5">
        <Link href={ROUTES.JOURNAL.LIST} className="block w-full">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="text-[17px] shadow-lg shadow-[#3182F6]/30"
          >
            3초 만에 시작하기
          </Button>
        </Link>
      </div>
    </div>
  )
}
