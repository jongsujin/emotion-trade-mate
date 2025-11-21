'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES, type EmotionType } from '@/constants'
import TitleSection from '@/components/common/TitleSection'
import { Button } from '@/components/common/Button'
import { EmotionAddForm } from '@/components/journal/add-emotion'
import type { EmotionAddFormData, EmotionAddRequest } from '@/types/journals'

interface AddEmotionPageProps {
  params: Promise<{ id: string }>
}

export default function AddEmotionPage({ params }: AddEmotionPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)
  const [formData, setFormData] = useState<EmotionAddFormData>({
    price: '',
    quantity: '',
    memo: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)

  // TODO: 일지 정보 조회 (종목명, 심볼 가져오기)
  const journalSymbol = 'AAPL' // 임시
  const journalSymbolName = 'Apple Inc.' // 임시

  /**
   * 현재가 자동 조회
   */
  const handleFetchPrice = async () => {
    setIsLoadingPrice(true)
    try {
      // 임시: mock 데이터
      setTimeout(() => {
        setFormData({ ...formData, price: '75000' })
        setIsLoadingPrice(false)
      }, 500)
    } catch (error) {
      console.error('현재가 조회 실패:', error)
      setIsLoadingPrice(false)
    }
  }

  /**
   * 폼 데이터를 API 요청 형식으로 변환
   */
  const convertFormToRequest = (): EmotionAddRequest => {
    const request: EmotionAddRequest = {
      emotionId: selectedEmotion!,
    }

    if (formData.price) {
      request.price = Number(formData.price)
    }

    if (formData.quantity) {
      request.quantity = Number(formData.quantity)
      // 추가 매수 시 가격 필수
      if (!formData.price) {
        throw new Error('추가 매수 시 현재 가격을 입력해주세요')
      }
    }

    if (formData.memo) {
      request.memo = formData.memo
    }

    return request
  }

  /**
   * 저장 핸들러
   */
  const handleSubmit = async () => {
    if (!selectedEmotion) {
      alert('감정을 선택해주세요')
      return
    }

    // 추가 매수 수량이 있으면 가격 필수
    if (formData.quantity && !formData.price) {
      alert('추가 매수 시 현재 가격을 입력해주세요')
      return
    }

    setIsLoading(true)

    try {
      const requestData = convertFormToRequest()
      console.log('감정 기록 추가:', requestData)
      // 성공 시 일지 상세 페이지로 이동
      router.push(ROUTES.JOURNAL.DETAIL(Number(id)))
    } catch (error) {
      console.error('감정 기록 추가 실패:', error)
      alert('감정 기록 추가 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = selectedEmotion && formData.price

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="bg-[#F4F5F7] sticky top-0 z-10">
        <TitleSection title="감정 추가" onClick={() => router.back()} />
      </div>

      <EmotionAddForm
        symbol={journalSymbol}
        symbolName={journalSymbolName}
        formData={formData}
        setFormData={setFormData}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        onFetchPrice={handleFetchPrice}
        isLoadingPrice={isLoadingPrice}
      />

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F2F4F6] p-5 pb-8 max-w-[480px] mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            fullWidth
            size="lg"
            className={`text-[17px] font-bold ${
              isFormValid ? 'shadow-lg shadow-[#6C9EFF]/30 bg-[#6C9EFF] hover:bg-[#4B82F0]' : 'bg-[#E5E8EB] text-[#B0B8C1]'
            }`}
          >
            {isLoading ? '저장 중...' : '기록하기'}
        </Button>
      </div>
    </div>
  )
}
