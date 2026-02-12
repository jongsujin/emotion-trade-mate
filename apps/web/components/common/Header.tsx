import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-text-primary">EmotionTrade</span>
        </Link>
      </div>
    </header>
  )
}
