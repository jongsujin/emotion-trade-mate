export interface PdfDownloadButtonProps {
  onClick?: () => void
}

export default function PdfDownloadButton({ onClick }: PdfDownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-500 active:bg-primary-600 w-full rounded-2xl py-4 font-semibold text-white"
    >
      전체 리포트 PDF 다운로드
    </button>
  )
}

