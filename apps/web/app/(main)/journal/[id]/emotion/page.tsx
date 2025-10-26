import { type Metadata } from 'next'

interface AddEmotionPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: AddEmotionPageProps): Promise<Metadata> {
  // TODO: ID로 일지 정보 조회하여 종목명 가져오기
  const { id } = await params

  console.log('비동기 id 조회', id)

  return {
    title: `감정 추가 | EmotionTrade`,
    description: `새로운 감정 기록 추가`,
  }
}

/**
 * 감정 추가 기록 페이지
 * - 현재 시세 입력 or 자동 호출
 * - 감정 선택 (이모지)
 * - 감정 메모 입력
 */
export default async function AddEmotionPage({ params }: AddEmotionPageProps) {
  const { id } = await params

  console.log('비동기 id 조회', id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">종목명 (로딩중...)</h1>
        <p className="mt-2 text-gray-600">새로운 감정 기록 추가</p>
      </div>

      {/* TODO: 감정 추가 폼 컴포넌트 구현 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="text-center text-gray-500">💰 현재 시세 입력 영역 (구현 예정)</div>
          <div className="text-center text-gray-500">😊 감정 선택 영역 (구현 예정)</div>
          <div className="text-center text-gray-500">📝 메모 입력 영역 (구현 예정)</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
          취소
        </button>
        <button className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
          저장
        </button>
      </div>
    </div>
  )
}
