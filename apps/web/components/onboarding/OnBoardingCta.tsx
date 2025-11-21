import { ROUTES } from '@/constants'
import Link from 'next/link'
import { Button } from '../common'

export default function OnBoardingCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#F2F4F6] via-[#F2F4F6] to-transparent pb-8 pt-12 pointer-events-none">
      <div className="mx-auto max-w-[480px] px-5 pointer-events-auto">
        <Link href={ROUTES.JOURNAL.CREATE} className="block w-full">
          <Button variant="primary" size="lg" fullWidth className="shadow-lg shadow-[#3182F6]/30 text-[17px]">
            3초 만에 시작하기
          </Button>
        </Link>
      </div>
    </div>
  )
}
