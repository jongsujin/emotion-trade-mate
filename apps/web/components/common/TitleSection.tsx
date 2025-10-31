interface TitleSectionProps {
  title: string
  onClick?: () => void
}

export default function TitleSection({ title, onClick }: TitleSectionProps) {
  return (
    <div className="mx-4 rounded-2xl bg-white px-4 py-4">
      <div className="flex items-center gap-3">
        {onClick && (
          <button
            onClick={onClick}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <span className="text-xl">←</span>
          </button>
        )}
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  )
}
