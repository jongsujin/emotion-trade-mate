import { type Metadata } from 'next'

interface JournalDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: JournalDetailPageProps): Promise<Metadata> {
  // TODO: ID로 일지 정보 조회하여 종목명 가져오기
  return {
    title: `감정 타임라인 | EmotionTrade`,
    description: `투자 감정 기록 타임라인`,
  }
}

/**
 * 일지 상세 페이지 (감정 타임라인)
 * - 감정 타임라인 (이모지 + 날짜)
 * - 수익률 변화 그래프 (라인차트)
 * - 감정 요약 리스트 (메모 포함)
 * - AI 리포트 요청 버튼
 */
export default function JournalDetailPage({ params }: JournalDetailPageProps) {
  const { id } = params

  // TODO: ID로 일지 데이터 조회
  // const { data: journal } = useJournal(id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">종목명 (로딩중...)</h1>
          <p className="mt-2 text-gray-600">감정 타임라인</p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
          AI 리포트 보기
        </button>
      </div>

      {/* 수익률 요약 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <p className="text-sm text-gray-600">현재 수익률</p>
          <p className="mt-2 text-3xl font-bold text-green-600">+15.3%</p>
        </div>
      </div>

      {/* TODO: 수익률 그래프 컴포넌트 구현 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-center text-gray-500">수익률 라인차트 (구현 예정)</p>
      </div>

      {/* TODO: 감정 타임라인 컴포넌트 구현 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">감정 타임라인</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-center text-gray-500">감정 타임라인 (구현 예정)</p>
        </div>
      </div>
    </div>
  )
}
