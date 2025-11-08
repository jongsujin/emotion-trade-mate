'use client'

import { useState } from 'react'
import { EMOTION_DATA } from '@/constants'
import type { EmotionType } from '@/constants/emotions'
import type { EmotionAddFormData } from '@/types/journals'

interface EmotionAddFormProps {
  symbol: string
  symbolName: string
  formData: EmotionAddFormData
  setFormData: React.Dispatch<React.SetStateAction<EmotionAddFormData>>
  selectedEmotion: EmotionType | null
  setSelectedEmotion: React.Dispatch<React.SetStateAction<EmotionType | null>>
  onFetchPrice?: () => Promise<void>
  isLoadingPrice?: boolean
}

/**
 * 감정 추가 폼 컴포넌트
 * - 현재 시세 입력/자동 조회
 * - 감정 선택
 * - 메모 입력
 * - 추가 매수 수량 (선택)
 */
export default function EmotionAddForm({
  symbol,
  symbolName,
  formData,
  setFormData,
  selectedEmotion,
  setSelectedEmotion,
  onFetchPrice,
  isLoadingPrice = false,
}: EmotionAddFormProps) {
  const [showAdditionalBuy, setShowAdditionalBuy] = useState(false)

  return (
    <div className="space-y-3 px-4 py-5">
      {/* 종목 정보 표시 */}
      <div className="rounded-2xl bg-white p-4">
        <h2 className="text-base font-semibold text-gray-900">종목 정보</h2>
        <p className="mt-1 text-xs text-gray-500">감정을 기록할 종목</p>
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-900">{symbolName}</p>
          <p className="text-xs text-gray-600">{symbol}</p>
        </div>
      </div>

      {/* 현재 시세 입력 */}
      <div className="rounded-2xl bg-white p-4">
        <h2 className="text-base font-semibold text-gray-900">현재 시세</h2>
        <p className="mt-1 text-xs text-gray-500">오늘의 주가를 입력하세요</p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-gray-600">현재 가격</label>
            <div className="relative mt-1">
              <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-500">₩</span>
              <input
                type="number"
                placeholder="75000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="focus:border-primary-500 w-full rounded-xl border border-gray-200 py-3 pr-3.5 pl-7 text-base focus:outline-none"
              />
            </div>
          </div>

          {onFetchPrice && (
            <button
              type="button"
              onClick={onFetchPrice}
              disabled={isLoadingPrice}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              {isLoadingPrice ? '조회 중...' : '💰 현재가 자동 조회'}
            </button>
          )}
        </div>
      </div>

      {/* 감정 선택 */}
      <div className="rounded-2xl bg-white p-4">
        <h2 className="text-base font-semibold text-gray-900">감정 선택</h2>
        <p className="mt-1 text-xs text-gray-500">지금 어떤 감정인가요?</p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {Object.values(EMOTION_DATA).map((emotion) => (
            <button
              key={emotion.id}
              type="button"
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-all ${
                selectedEmotion === emotion.id
                  ? 'bg-primary-50 ring-primary-500 ring-2'
                  : 'bg-gray-50 active:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="text-xs font-medium text-gray-700">{emotion.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 추가 매수 (선택) */}
      <div className="rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">추가 매수</h2>
            <p className="mt-1 text-xs text-gray-500">오늘 추가로 매수하셨나요?</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowAdditionalBuy(!showAdditionalBuy)
              if (showAdditionalBuy) {
                setFormData({ ...formData, quantity: '' })
              }
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              showAdditionalBuy
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showAdditionalBuy ? '추가 매수함' : '추가 매수 안함'}
          </button>
        </div>

        {showAdditionalBuy && (
          <div className="mt-4">
            <label className="text-xs text-gray-600">추가 매수 수량</label>
            <div className="relative mt-1">
              <input
                type="number"
                placeholder="10"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="focus:border-primary-500 w-full rounded-xl border border-gray-200 px-3.5 py-3 text-base focus:outline-none"
              />
              <span className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-500">주</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              💡 추가 매수 시 평균 단가가 자동으로 재계산됩니다
            </p>
          </div>
        )}
      </div>

      {/* 메모 (선택) */}
      <div className="rounded-2xl bg-white p-4">
        <h2 className="text-base font-semibold text-gray-900">
          메모 <span className="text-sm font-normal text-gray-500">(선택)</span>
        </h2>
        <p className="mt-1 text-xs text-gray-500">왜 그런 감정이었는지 기록해보세요</p>

        <textarea
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          placeholder="예: 주가가 급등해서 FOMO가 생겼다..."
          maxLength={200}
          className="focus:border-primary-500 mt-3 h-20 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm focus:outline-none"
        />
        <div className="mt-2 text-right text-xs text-gray-500">{formData.memo.length}/200</div>
      </div>

      {/* 팁 카드 */}
      <div className="rounded-2xl bg-blue-50 p-3.5">
        <div className="flex gap-2.5">
          <span className="text-lg">💡</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">감정 기록이 쌓이면</p>
            <p className="mt-0.5 text-xs text-blue-700">AI가 당신의 투자 패턴을 분석해드려요</p>
          </div>
        </div>
      </div>
    </div>
  )
}

