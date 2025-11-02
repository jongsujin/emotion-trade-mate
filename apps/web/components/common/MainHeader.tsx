export default function MainHeader() {
  return (
    <header className="bg-primary-500 shadow-soft sticky top-0 z-40 border-b border-gray-100">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <span className="text-xl">📊</span>
          </div>
          <h1 className="text-xl font-bold text-white">EmotionTrade</h1>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white transition-colors hover:bg-white/30">
          🔔
        </button>
      </div>
    </header>
  )
}
