'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants'
import TitleSection from '@/components/common/TitleSection'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { EmotionAddForm } from '@/components/journal/add-emotion'
import { useGetJournalDetail, useCreateJournalEvent } from '@/features/journal'
import type { CreateJournalEventRequest } from '@/types'

interface AddEventPageProps {
  params: Promise<{ id: string }>
}

type EventType = 'BUY' | 'EMOTION'

export default function AddEventPage({ params }: AddEventPageProps) {
  const { id } = use(params)
  const journalId = Number(id)
  const router = useRouter()

  // journal 정보 조회
  const { data: journalData, isLoading: isJournalLoading } = useGetJournalDetail(journalId)
  const createEventMutation = useCreateJournalEvent()

  // 이벤트 타입 선택
  const [eventType, setEventType] = useState<EventType>('EMOTION')

  // 감정 관련 상태
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])

  // 폼 데이터
  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    memo: '',
  })

  const [isLoadingPrice, setIsLoadingPrice] = useState(false)

  // journal 정보 추출
  const journalSymbol = journalData?.data?.journal.symbol || ''
  const journalSymbolName = journalData?.data?.journal.symbolName || ''
  const currentPrice = journalData?.data?.metrics.currentPrice

  /**
   * 현재가 자동 조회
   */
  const handleFetchPrice = async () => {
    if (!currentPrice) {
      alert('현재 가격 정보를 불러올 수 없습니다.')
      return
    }

    setIsLoadingPrice(true)
    try {
      // 실제로는 외부 API 호출, 지금은 journal의 현재 가격 사용
      setFormData((prev) => ({ ...prev, price: currentPrice.toString() }))
      setIsLoadingPrice(false)
    } catch (error) {
      console.error('현재가 조회 실패:', error)
      setIsLoadingPrice(false)
    }
  }

  /**
   * 폼 데이터를 API 요청 형식으로 변환
   */
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
    } else if (eventType === 'BUY') {
      if (!formData.quantity || Number(formData.quantity) <= 0) {
        throw new Error('추가 매수 수량을 입력해주세요')
      }
      if (!formData.price && !currentPrice) {
        throw new Error('매수 가격을 입력하거나 현재가를 불러와주세요')
      }

      return {
        ...baseRequest,
        quantity: Number(formData.quantity),
      }
    }

    throw new Error('지원하지 않는 이벤트 타입입니다')
  }

  /**
   * 저장 핸들러
   */
  const handleSubmit = async () => {
    try {
      const requestData = convertFormToRequest()

      await createEventMutation.mutateAsync(
        { journalId, data: requestData },
        {
          onSuccess: () => {
            // 성공 시 상세 페이지로 이동
            router.push(ROUTES.JOURNAL.DETAIL(journalId))
          },
          onError: (error: unknown) => {
            console.error('이벤트 추가 실패:', error)

            // API 에러 메시지 처리
            const errorMessage = '이벤트 추가 중 오류가 발생했습니다'

            alert(`이벤트 추가 실패: ${errorMessage}`)
          },
        }
      )
    } catch (error) {
      console.error('폼 검증 실패:', error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('이벤트 추가 중 오류가 발생했습니다')
      }
    }
  }

  /**
   * 폼 유효성 검증
   */
  const isFormValid = (() => {
    if (eventType === 'EMOTION') {
      return selectedEmotions.length > 0 && (formData.price || currentPrice)
    } else if (eventType === 'BUY') {
      return formData.quantity && (formData.price || currentPrice)
    }
    return false
  })()

  if (isJournalLoading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] pb-24">
        <div className="sticky top-0 z-10 bg-[#F4F5F7]">
          <TitleSection title="이벤트 추가" onClick={() => router.back()} />
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#3182F6] border-t-transparent" />
            <p className="text-[#6B7684]">일지 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]">
        <TitleSection title="이벤트 추가" onClick={() => router.back()} />
      </div>

      {/* 이벤트 타입 선택 */}
      <div className="px-5 pt-6">
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-bold text-[#1A1A1A]">어떤 이벤트를 기록하시겠어요?</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setEventType('EMOTION')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition-colors ${
                eventType === 'EMOTION'
                  ? 'border-[#6C9EFF] bg-[#6C9EFF]/5 text-[#6C9EFF]'
                  : 'border-[#E5E8EB] bg-white text-[#6B7684]'
              }`}
            >
              <div className="text-sm font-semibold">감정 기록</div>
              <div className="mt-1 text-xs">현재 감정과 메모</div>
            </button>
            <button
              onClick={() => setEventType('BUY')}
              className={`flex-1 rounded-lg border-2 p-4 text-center transition-colors ${
                eventType === 'BUY'
                  ? 'border-[#6C9EFF] bg-[#6C9EFF]/5 text-[#6C9EFF]'
                  : 'border-[#E5E8EB] bg-white text-[#6B7684]'
              }`}
            >
              <div className="text-sm font-semibold">추가 매수</div>
              <div className="mt-1 text-xs">수량과 가격 기록</div>
            </button>
          </div>
        </div>

        {/* 가격 입력 (공통) */}
        <Card className="mb-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
              {eventType === 'EMOTION' ? '현재 시세' : '매수 가격'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={eventType === 'EMOTION' ? '현재 시세 입력' : '매수 가격 입력'}
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="flex-1 rounded-lg border border-[#E5E8EB] px-3 py-3 text-sm placeholder-[#B0B8C1] focus:border-[#6C9EFF] focus:outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleFetchPrice}
                disabled={isLoadingPrice}
                className="px-3 py-3"
              >
                {isLoadingPrice ? '불러오는 중...' : '현재가'}
              </Button>
            </div>
            {currentPrice && (
              <p className="mt-1 text-xs text-[#6B7684]">
                현재가: {currentPrice.toLocaleString()}원
              </p>
            )}
          </div>
        </Card>

        {/* 이벤트별 폼 */}
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
        ) : (
          <Card className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                추가 매수 수량 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="추가 매수 수량 입력"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                className="w-full rounded-lg border border-[#E5E8EB] px-3 py-3 text-sm placeholder-[#B0B8C1] focus:border-[#6C9EFF] focus:outline-none"
              />
            </div>
          </Card>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 mx-auto max-w-[480px] border-t border-[#F2F4F6] bg-white p-5 pb-8 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || createEventMutation.isPending}
          fullWidth
          size="lg"
          className={`text-[17px] font-bold ${
            isFormValid
              ? 'bg-[#6C9EFF] shadow-lg shadow-[#6C9EFF]/30 hover:bg-[#4B82F0]'
              : 'bg-[#E5E8EB] text-[#B0B8C1]'
          }`}
        >
          {createEventMutation.isPending ? '저장 중...' : '기록하기'}
        </Button>
      </div>
    </div>
  )
}
