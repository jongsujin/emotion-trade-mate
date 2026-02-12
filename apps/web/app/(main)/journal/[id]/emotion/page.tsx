'use client'

import { use, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'
import { ROUTES } from '@/constants'
import TitleSection from '@/components/common/TitleSection'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { EmotionAddForm } from '@/components/journal/add-emotion'
import { useGetJournalDetail, useCreateJournalEvent } from '@/features/journal'
import type { CreateJournalEventRequest } from '@/types'
import { formatPriceWithSymbol } from '@/lib/utils'

interface AddEventPageProps {
  params: Promise<{ id: string }>
}

type EventType = 'BUY' | 'SELL' | 'EMOTION' | 'NOTE'

const EVENT_OPTIONS: Array<{ type: EventType; title: string; description: string; accent: string }> = [
  { type: 'EMOTION', title: '감정 기록', description: '현재 감정과 메모', accent: '#67ccf4' },
  { type: 'BUY', title: '추가 매수', description: '수량과 가격 기록', accent: '#67ccf4' },
  { type: 'SELL', title: '부분 매도', description: '익절/손절 기록', accent: '#f43f5e' },
  { type: 'NOTE', title: '메모', description: '상황/회고 기록', accent: '#94a3b8' },
]

export default function AddEventPage({ params }: AddEventPageProps) {
  const { id } = use(params)
  const journalId = Number(id)
  const router = useRouter()

  const { data: journalData, isLoading: isJournalLoading } = useGetJournalDetail(journalId)
  const createEventMutation = useCreateJournalEvent()

  const [eventType, setEventType] = useState<EventType>('EMOTION')
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    memo: '',
  })
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)

  const journalSymbol = journalData?.data?.journal.symbol || ''
  const journalSymbolName = journalData?.data?.journal.symbolName || ''
  const currentPrice = journalData?.data?.metrics.currentPrice

  const selectedOption = useMemo(
    () => EVENT_OPTIONS.find((option) => option.type === eventType) ?? EVENT_OPTIONS[0]!,
    [eventType]
  )

  const handleFetchPrice = async () => {
    if (!currentPrice) {
      alert('현재가 정보를 아직 불러오지 못했습니다.')
      return
    }

    setIsLoadingPrice(true)
    setFormData((prev) => ({ ...prev, price: currentPrice.toString() }))
    setTimeout(() => setIsLoadingPrice(false), 250)
  }

  const convertFormToRequest = (): CreateJournalEventRequest => {
    const baseRequest = {
      type: eventType,
      price: Number(formData.price) || currentPrice || 0,
      memo: formData.memo.trim() || undefined,
    }

    if (eventType === 'EMOTION') {
      if (selectedEmotions.length === 0) {
        throw new Error('감정을 하나 이상 선택해주세요')
      }

      return {
        ...baseRequest,
        emotionCodes: selectedEmotions,
      }
    }

    if (eventType === 'BUY' || eventType === 'SELL') {
      if (!formData.quantity || Number(formData.quantity) <= 0) {
        throw new Error('수량을 입력해주세요')
      }
      if (!formData.price && !currentPrice) {
        throw new Error('가격을 입력하거나 현재가를 불러와주세요')
      }

      return {
        ...baseRequest,
        quantity: Number(formData.quantity),
      }
    }

    if (eventType === 'NOTE') {
      if (!formData.memo.trim()) {
        throw new Error('메모를 입력해주세요')
      }

      return baseRequest
    }

    throw new Error('지원하지 않는 이벤트 타입입니다')
  }

  const handleSubmit = async () => {
    try {
      const requestData = convertFormToRequest()

      await createEventMutation.mutateAsync(
        { journalId, data: requestData },
        {
          onSuccess: () => {
            router.push(ROUTES.JOURNAL.DETAIL(journalId))
          },
          onError: () => {
            alert('이벤트 추가에 실패했습니다. 잠시 후 다시 시도해주세요.')
          },
        }
      )
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('이벤트 추가 중 오류가 발생했습니다')
      }
    }
  }

  const isFormValid = (() => {
    if (eventType === 'EMOTION') {
      return selectedEmotions.length > 0 && (formData.price || currentPrice)
    }
    if (eventType === 'BUY' || eventType === 'SELL') {
      return formData.quantity && (formData.price || currentPrice)
    }
    if (eventType === 'NOTE') {
      return formData.memo.trim().length > 0
    }
    return false
  })()

  if (isJournalLoading) {
    return (
      <div className="space-y-4 px-5 pt-6">
        <div className="state-loading-skeleton h-12 rounded-xl" />
        <div className="state-loading-skeleton h-48 rounded-3xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-24">
      <div className="sticky top-0 z-10 bg-[#f6f7f8]/95 backdrop-blur-md">
        <TitleSection title="이벤트 추가" onClick={() => router.back()} />
      </div>

      <div className="space-y-4 px-5 pb-8 pt-3">
        <Card className="rounded-2xl border border-[#f1f5f9] bg-white p-5">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#94a3b8] uppercase">대상 일지</p>
          <h2 className="mt-2 text-lg font-bold text-[#0f172a]">{journalSymbol}</h2>
          <p className="text-sm text-[#64748b]">{journalSymbolName}</p>
        </Card>

        <Card className="space-y-4 rounded-2xl border border-[#f1f5f9] bg-white p-5">
          <h3 className="text-base font-bold text-[#0f172a]">기록 유형 선택</h3>
          <div className="grid grid-cols-2 gap-2">
            {EVENT_OPTIONS.map((option) => {
              const isActive = eventType === option.type
              return (
                <button
                  key={option.type}
                  onClick={() => setEventType(option.type)}
                  className={
                    isActive
                      ? 'rounded-xl border-2 bg-white px-3 py-3 text-left'
                      : 'rounded-xl border border-[#e2e8f0] bg-white px-3 py-3 text-left'
                  }
                  style={
                    isActive
                      ? {
                          borderColor: option.accent,
                          backgroundColor: `${option.accent}14`,
                        }
                      : undefined
                  }
                >
                  <p className="text-sm font-semibold text-[#0f172a]">{option.title}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{option.description}</p>
                </button>
              )
            })}
          </div>
        </Card>

        <Card className="space-y-3 rounded-2xl border border-[#f1f5f9] bg-white p-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#334155]">
              {selectedOption.title} 가격 {eventType === 'NOTE' ? '(선택)' : '(필수)'}
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFetchPrice}
              disabled={isLoadingPrice}
              className="h-8 px-3"
            >
              <span className="flex items-center gap-1">
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingPrice ? 'animate-spin' : ''}`} />
                현재가
              </span>
            </Button>
          </div>

          <input
            type="number"
            placeholder="가격 입력"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
            className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#67ccf4] focus:outline-none"
          />

          {currentPrice ? (
            <p className="text-xs text-[#64748b]">
              현재가: {formatPriceWithSymbol(currentPrice, journalSymbol)}
            </p>
          ) : null}
        </Card>

        {eventType === 'EMOTION' ? (
          <EmotionAddForm
            symbol={journalSymbol}
            symbolName={journalSymbolName}
            formData={formData}
            setFormData={setFormData}
            selectedEmotions={selectedEmotions}
            setSelectedEmotions={setSelectedEmotions}
            onFetchPrice={handleFetchPrice}
            isLoadingPrice={isLoadingPrice}
          />
        ) : null}

        {(eventType === 'BUY' || eventType === 'SELL') && (
          <Card className="space-y-3 rounded-2xl border border-[#f1f5f9] bg-white p-5">
            <label className="text-sm font-semibold text-[#334155]">
              {eventType === 'BUY' ? '추가 매수 수량' : '매도 수량'} (필수)
            </label>
            <input
              type="number"
              placeholder="수량 입력"
              value={formData.quantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#67ccf4] focus:outline-none"
            />

            <label className="pt-2 text-sm font-semibold text-[#334155]">메모 (선택)</label>
            <textarea
              value={formData.memo}
              onChange={(e) => setFormData((prev) => ({ ...prev, memo: e.target.value }))}
              placeholder="결정 배경을 간단히 기록해보세요."
              className="h-24 w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#67ccf4] focus:outline-none"
            />
          </Card>
        )}

        {eventType === 'NOTE' && (
          <Card className="space-y-3 rounded-2xl border border-[#f1f5f9] bg-white p-5">
            <label className="text-sm font-semibold text-[#334155]">메모 내용 (필수)</label>
            <textarea
              value={formData.memo}
              onChange={(e) => setFormData((prev) => ({ ...prev, memo: e.target.value }))}
              placeholder="시장 상황, 의사결정 배경, 다음 계획을 적어보세요."
              className="h-28 w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#67ccf4] focus:outline-none"
            />
          </Card>
        )}
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-20 mx-auto max-w-[480px] border-t border-[#e2e8f0] bg-white/95 p-4 pb-8 backdrop-blur-md">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || createEventMutation.isPending}
          fullWidth
          size="lg"
          className="h-12 text-base font-semibold"
        >
          {createEventMutation.isPending ? '저장 중...' : '기록 저장'}
        </Button>
      </div>
    </div>
  )
}
