import { type Metadata } from 'next'

interface ReportPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  // TODO: ID로 일지 정보 조회하여 종목명 가져오기
  return {
    title: `AI 리포트 | EmotionTrade`,
    description: `AI 분석 리포트`,
  }
}

/**
 * AI 리포트 페이지
 * - AI 요약 리포트 (감정 흐름 패턴, 행동 피드백)
 * - 감정 트렌드 그래프
 * - PDF 다운로드 버튼
 */
export default function ReportPage({ params }: ReportPageProps) {
  const { id } = params

  // TODO: ID로 리포트 데이터 조회
  // const { data: report } = useReport(id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI 리포트</h1>
          <p className="mt-2 text-gray-600">AI가 분석한 감정 패턴과 피드백</p>
        </div>
        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
          📄 PDF 다운로드
        </button>
      </div>

      {/* 감정 패턴 요약 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">감정 패턴 분석</h2>
        <p className="text-gray-500">AI 분석 결과 (구현 예정)</p>
      </div>

      {/* TODO: 감정 트렌드 그래프 컴포넌트 구현 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">감정 트렌드</h2>
        <p className="text-center text-gray-500">감정 트렌드 그래프 (구현 예정)</p>
      </div>

      {/* 행동 피드백 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">행동 피드백</h2>
        <p className="text-gray-500">AI 피드백 (구현 예정)</p>
      </div>
    </div>
  )
}
