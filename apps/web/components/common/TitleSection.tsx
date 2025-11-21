interface TitleSectionProps {
  title: string
  onClick?: () => void
}

export default function TitleSection({ title, onClick }: TitleSectionProps) {
  return (
    <div className="flex items-center gap-1 px-5 py-3">
      {onClick && (
        <button
          onClick={onClick}
          className="flex h-10 w-10 -ml-2 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <span className="text-2xl text-[#191F28] pb-1">←</span>
        </button>
      )}
      <h1 className="text-xl font-bold text-[#191F28]">{title}</h1>
    </div>
  )
}
