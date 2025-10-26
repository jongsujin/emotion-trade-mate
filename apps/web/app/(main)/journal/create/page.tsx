'use client'

import { useState } from 'react'
import { Card, Button } from '@/components/common'
import { EMOTION_DATA } from '@/constants'

// export const metadata: Metadata = {
//   title: '감정 일지 작성 | EmotionTrade',
//   description: '새로운 감정 일지를 작성합니다',
// }

type Step = 'upload' | 'emotion' | 'memo'

/**
 * 감정 일지 생성 페이지 - 단계별 UI
 * Step 1: 스크린샷 업로드
 * Step 2: 감정 선택
 * Step 3: 메모 작성
 */
export default function JournalCreatePage() {
  const [step, setStep] = useState<Step>('upload')
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [memo, setMemo] = useState('')

  // Mock OCR 데이터
  const [ocrData, setOcrData] = useState({
    symbol: '',
    symbolName: '',
    price: '',
    quantity: '',
  })

  const handleImageUpload = () => {
    // Mock OCR 처리
    setOcrData({
      symbol: 'AAPL',
      symbolName: 'Apple Inc.',
      price: '180.75',
      quantity: '10',
    })
    setStep('emotion')
  }

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId)
  }

  const handleSubmit = () => {
    console.log('Submit:', { ocrData, selectedEmotion, memo })
    // TODO: API 호출
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              step === 'upload' ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          />
          <div
            className={`h-2 w-2 rounded-full ${
              step === 'emotion' ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          />
          <div
            className={`h-2 w-2 rounded-full ${step === 'memo' ? 'bg-primary-500' : 'bg-gray-300'}`}
          />
        </div>
        <span className="text-sm text-gray-500">
          {step === 'upload' && '1/3'}
          {step === 'emotion' && '2/3'}
          {step === 'memo' && '3/3'}
        </span>
      </div>

      {/* Step 1: 스크린샷 업로드 */}
      {step === 'upload' && (
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">거래 내역 스크린샷</h1>
            <p className="mt-1 text-sm text-gray-600">증권사 앱의 체결 내역을 캡처해주세요</p>
          </div>

          <Card variant="default" padding="none">
            <button
              onClick={handleImageUpload}
              className="flex w-full flex-col items-center justify-center gap-4 p-12 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                <span className="text-3xl">📷</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">사진 업로드</p>
                <p className="mt-1 text-sm text-gray-500">JPG, PNG • 최대 5MB</p>
              </div>
            </button>
          </Card>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">OCR로 자동 인식</p>
                <p className="mt-1 text-xs text-blue-700">
                  종목명, 가격, 수량이 자동으로 입력됩니다
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: 감정 선택 */}
      {step === 'emotion' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">어떤 감정이었나요?</h1>
            <p className="mt-1 text-sm text-gray-600">거래 시점의 감정을 선택해주세요</p>
          </div>

          {/* OCR 결과 */}
          <Card variant="elevated" padding="md">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">종목</span>
                <span className="font-semibold text-gray-900">{ocrData.symbolName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">가격</span>
                <span className="font-semibold text-gray-900">${ocrData.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">수량</span>
                <span className="font-semibold text-gray-900">{ocrData.quantity}주</span>
              </div>
            </div>
          </Card>

          {/* 감정 선택 */}
          <div className="grid grid-cols-2 gap-3">
            {Object.values(EMOTION_DATA).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleEmotionSelect(emotion.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                  selectedEmotion === emotion.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-4xl">{emotion.emoji}</span>
                <span className="text-sm font-medium text-gray-900">{emotion.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep('upload')} className="flex-1">
              이전
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep('memo')}
              disabled={!selectedEmotion}
              className="flex-1"
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: 메모 작성 */}
      {step === 'memo' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">메모를 남겨보세요</h1>
            <p className="mt-1 text-sm text-gray-600">왜 이 감정이었는지 간단히 기록해주세요</p>
          </div>

          {/* 선택된 감정 */}
          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                <span className="text-3xl">
                  {EMOTION_DATA[selectedEmotion as keyof typeof EMOTION_DATA]?.emoji}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">선택한 감정</p>
                <p className="text-lg font-semibold text-gray-900">
                  {EMOTION_DATA[selectedEmotion as keyof typeof EMOTION_DATA]?.label}
                </p>
              </div>
            </div>
          </Card>

          {/* 메모 입력 */}
          <div>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예: 뉴스를 보고 충동적으로 매수했다..."
              className="h-32 w-full rounded-xl border border-gray-200 p-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="mt-2 text-xs text-gray-500">{memo.length}/200자</p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep('emotion')} className="flex-1">
              이전
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              완료
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
