import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#F2F4F6]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#191F28]">EmotionTrade</span>
        </Link>
      </div>
    </header>
  )
}
