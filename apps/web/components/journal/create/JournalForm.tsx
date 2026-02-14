'use client'

import { CalendarDays, FileText, PieChart, ReceiptText, Sparkles } from 'lucide-react'
import { EMOTION_DATA } from '@/constants'
import type { JournalFormProps } from '@/types/journals'
import { Card } from '@/components/common/Card'
import { inferCurrencyFromSymbol } from '@/lib/utils'

const PRIMARY_EMOTION_CODES = [
  'CONFIDENT',
  'CALM',
  'ANXIOUS',
  'GREED',
  'FEAR',
  'OPTIMISTIC',
  'IMPULSIVE',
  'CAUTIOUS',
] as const

export default function JournalForm({
  formData,
  setFormData,
  selectedEmotion,
  setSelectedEmotion,
}: JournalFormProps) {
  const emotions = PRIMARY_EMOTION_CODES.map((code) => EMOTION_DATA[code]).filter(Boolean)
  const currencyLabel = inferCurrencyFromSymbol(formData.symbol || '') === 'USD' ? 'USD' : 'KRW'
  const todayLabel = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })

  return (
    <div className="space-y-8 px-4 pb-8 pt-6">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#64748b] uppercase">
          <PieChart className="h-3.5 w-3.5 text-[#67ccf4]" />
          자산 정보
        </div>

        <Card className="overflow-hidden rounded-xl border border-[#f1f5f9] bg-white p-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="border-b border-[#f1f5f9] px-4 py-3">
            <label className="text-xs font-medium text-[#94a3b8]">심볼</label>
            <input
              type="text"
              placeholder="예: AAPL"
              value={formData.symbol}
              onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
              className="mt-2 w-full border-none bg-transparent text-lg font-semibold uppercase text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none"
            />
          </div>

          <div className="px-4 py-3">
            <label className="text-xs font-medium text-[#94a3b8]">종목명</label>
            <input
              type="text"
              placeholder="예: Apple Inc."
              value={formData.symbolName}
              onChange={(e) => setFormData((prev) => ({ ...prev, symbolName: e.target.value }))}
              className="mt-2 w-full border-none bg-transparent text-base text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none"
            />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#64748b] uppercase">
          <ReceiptText className="h-3.5 w-3.5 text-[#67ccf4]" />
          거래 정보
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-xl border border-[#f1f5f9] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <label className="text-xs font-medium text-[#94a3b8]">매수가</label>
            <div className="mt-2 flex items-center justify-between gap-2">
              <input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full border-none bg-transparent text-lg font-semibold text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none"
              />
              <span className="text-sm font-medium text-[#94a3b8]">{currencyLabel}</span>
            </div>
          </Card>

          <Card className="rounded-xl border border-[#f1f5f9] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <label className="text-xs font-medium text-[#94a3b8]">수량</label>
            <div className="mt-2 flex items-center justify-between gap-2">
              <input
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                className="w-full border-none bg-transparent text-lg font-semibold text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none"
              />
              <span className="text-sm font-medium text-[#94a3b8]">주</span>
            </div>
          </Card>
        </div>

        <Card className="rounded-xl border border-[#f1f5f9] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#94a3b8]">기록 날짜</p>
              <p className="mt-1 text-sm font-medium text-[#1e293b]">{todayLabel}</p>
            </div>
            <CalendarDays className="h-5 w-5 text-[#67ccf4]" />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#64748b] uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#67ccf4]" />
            감정 상태
          </div>
          <span className="text-xs font-medium text-[#67ccf4]">대표 감정 1개 선택</span>
        </div>

        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotion === emotion.id

            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => setSelectedEmotion(emotion.id)}
                className={
                  isSelected
                    ? 'inline-flex shrink-0 items-center gap-2 rounded-full border border-[#67ccf4] bg-[#67ccf4] px-4 py-2 text-sm font-medium text-white shadow-[0_4px_6px_-1px_rgba(103,204,244,0.3)]'
                    : 'inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#475569]'
                }
              >
                <span>{emotion.emoji}</span>
                <span>{emotion.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#64748b] uppercase">
          <FileText className="h-3.5 w-3.5 text-[#67ccf4]" />
          메모
        </div>

        <Card className="rounded-xl border border-[#f1f5f9] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <textarea
            value={formData.memo}
            onChange={(e) => setFormData((prev) => ({ ...prev, memo: e.target.value }))}
            placeholder="왜 지금 이 결정을 했는지 기록해보세요."
            maxLength={240}
            className="h-28 w-full resize-none border-none bg-transparent text-sm leading-6 text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none"
          />
          <div className="mt-2 text-right text-xs text-[#94a3b8]">{formData.memo.length}/240</div>
        </Card>
      </section>
    </div>
  )
}
