import { ReportPdfDownloadProps } from '@/types/reports'

export default function ReportPdfDownload({ onDownload }: ReportPdfDownloadProps) {
  return (
    <button
      onClick={onDownload}
      className="w-full rounded-2xl bg-white p-4 text-left active:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">📄</span>
          <div>
            <p className="font-semibold text-gray-900">PDF로 저장</p>
            <p className="text-sm text-gray-600">리포트를 다운로드하세요</p>
          </div>
        </div>
        <span className="text-gray-400">›</span>
      </div>
    </button>
  )
}

