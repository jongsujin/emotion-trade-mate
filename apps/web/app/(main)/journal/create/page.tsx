'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EMOTION_DATA, ROUTES } from '@/constants'

/**
 * 감정 일지 작성 페이지 - 토스 스타일 (한 화면에 모든 입력)
 */
export default function JournalCreatePage() {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    symbol: '',
    symbolName: '',
    price: '',
    quantity: '',
    memo: '',
  })

  const handleSubmit = () => {
    if (!selectedEmotion || !formData.symbol || !formData.price) {
      alert('필수 항목을 입력해주세요')
      return
    }

    console.log('Submit:', { ...formData, emotion: selectedEmotion })
    // TODO: API 호출
    router.push(ROUTES.JOURNAL.LIST)
  }

  const isFormValid = selectedEmotion && formData.symbol && formData.price && formData.quantity

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">감정 일지 작성</h1>
        </div>
      </div>

      <div className="space-y-2 px-5 py-6">
        {/* 1. 종목 정보 입력 */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">종목 정보</h2>
          <p className="mt-1 text-sm text-gray-500">어떤 종목을 거래했나요?</p>

          <div className="mt-4 space-y-3">
            {/* 종목 코드/이름 */}
            <div>
              <label className="text-xs text-gray-600">종목명</label>
              <input
                type="text"
                placeholder="예: AAPL"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">회사명 (선택)</label>
              <input
                type="text"
                placeholder="예: Apple Inc."
                value={formData.symbolName}
                onChange={(e) => setFormData({ ...formData, symbolName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* 가격 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">거래 가격</label>
                <div className="relative mt-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="180.75"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-8 pr-4 text-base focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">수량</label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:border-primary-500 focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    주
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 감정 선택 */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">거래 감정</h2>
          <p className="mt-1 text-sm text-gray-500">그때 어떤 감정이었나요?</p>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {Object.values(EMOTION_DATA).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${
                  selectedEmotion === emotion.id
                    ? 'bg-primary-50 ring-2 ring-primary-500'
                    : 'bg-gray-50 active:bg-gray-100'
                }`}
              >
                <span className="text-3xl">{emotion.emoji}</span>
                <span className="text-xs font-medium text-gray-700">{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. 메모 (선택) */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">
            메모 <span className="text-sm font-normal text-gray-500">(선택)</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">왜 그런 감정이었는지 기록해보세요</p>

          <textarea
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            placeholder="예: 주가가 급등해서 FOMO가 생겼다..."
            maxLength={200}
            className="mt-4 h-24 w-full resize-none rounded-xl border border-gray-200 p-4 text-sm focus:border-primary-500 focus:outline-none"
          />
          <div className="mt-2 text-right text-xs text-gray-500">{formData.memo.length}/200</div>
        </div>

        {/* 팁 카드 */}
        <div className="rounded-2xl bg-blue-50 p-4">
          <div className="flex gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">감정 기록이 쌓이면</p>
              <p className="mt-1 text-xs text-blue-700">AI가 당신의 투자 패턴을 분석해드려요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full rounded-xl py-4 text-base font-semibold transition-colors ${
            isFormValid
              ? 'bg-primary-500 text-white active:bg-primary-600'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isFormValid ? '작성 완료' : '필수 항목을 입력해주세요'}
        </button>
      </div>

      {/* 하단 버튼 공간 확보 */}
      <div className="h-24" />
    </div>
  )
}
