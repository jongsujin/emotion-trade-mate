'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Bell, TrendingUp } from 'lucide-react'
import { getDashboardData } from '@/features/report/api'
import { useJournals } from '@/features/journal'
import { useGetMe } from '@/features/auth/hooks'
import { ROUTES } from '@/constants'
import { formatKrwAmount, formatPercent } from '@/lib/utils'
import { EMOTION_DATA, type EmotionType } from '@/constants/emotions'

const MINDSET_OPTIONS = [
  { code: 'CONFIDENT', emoji: '🚀', label: '자신감' },
  { code: 'CALM', emoji: '🧘', label: '평온' },
  { code: 'ANXIOUS', emoji: '😨', label: '불안' },
  { code: 'GREED', emoji: '😤', label: '탐욕' },
] as const

const TIMEFRAME_OPTIONS = ['7D', '1M', 'YTD'] as const

function toShortDateLabel(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return `${date.getMonth() + 1}/${date.getDate()}`
}

function toTradeTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export default function DashboardPage() {
  const { data: me } = useGetMe()
  const {
    data: dashboardResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
  const { data: journalsResponse } = useJournals(1, 10)

  const [selectedMindset, setSelectedMindset] = useState<string | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<(typeof TIMEFRAME_OPTIONS)[number]>('7D')

  if (isLoading) {
    return (
      <div className="space-y-4 px-6 pt-10 pb-8">
        <div className="state-loading-skeleton h-28 rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="state-loading-skeleton h-24 rounded-2xl" />
          <div className="state-loading-skeleton h-24 rounded-2xl" />
        </div>
        <div className="state-loading-skeleton h-56 rounded-2xl" />
      </div>
    )
  }

  if (!dashboardResponse?.success || !dashboardResponse.data) {
    return (
      <div className="px-6 pt-24 pb-8">
        <div className="rounded-2xl border border-[#f1f5f9] bg-white p-8 text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
          <p className="text-lg font-bold text-[#0f172a]">대시보드를 불러오지 못했어요</p>
          <p className="mt-2 text-sm text-[#64748b]">
            네트워크 상태를 확인한 뒤 다시 시도해주세요.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-[#67ccf4] px-5 py-2.5 text-sm font-semibold text-white"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  const dashboardData = dashboardResponse.data
  const summary = dashboardData.summary
  const recentTrend = dashboardData.recentTrend

  const totalProfitRate =
    summary.totalCost > 0 ? (summary.totalProfit / summary.totalCost) * 100 : 0
  const isPositive = summary.totalProfit >= 0
  const trendColor = isPositive ? '#10b981' : '#f43f5e'

  const chartData =
    recentTrend.length === 0
      ? [
          { label: '월', profit: 0 },
          { label: '화', profit: 0 },
          { label: '수', profit: 0 },
          { label: '목', profit: 0 },
          { label: '금', profit: 0 },
        ]
      : recentTrend.map((item) => ({
          ...item,
          label: toShortDateLabel(item.date),
        }))

  const winRate = Math.max(0, Math.min(100, summary.winRate || 0))
  const ringStyle = {
    background: `conic-gradient(#67ccf4 ${winRate * 3.6}deg, #e7eef5 0deg)`,
  }

  const todayCode = dashboardData.todayEmotion?.code
  const activeMindset =
    selectedMindset ||
    (todayCode && MINDSET_OPTIONS.some((item) => item.code === todayCode) ? todayCode : 'CALM')

  const journals = journalsResponse?.data?.content ?? []
  const recentTrades = journals.slice(0, 2)
  const displayName = me?.nickname || '트레이더'

  return (
    <div className="px-6 pt-3 pb-8">
      <header className="sticky top-0 z-10 -mx-6 mb-3 border-b border-transparent bg-[rgba(246,247,248,0.9)] px-6 pt-8 pb-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcca8] text-sm font-bold text-[#0f172a]">
              {displayName.slice(0, 1)}
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280]">좋은 아침이에요,</p>
              <p className="text-xl leading-[0.9] font-bold tracking-[-0.03em] text-[#111827]">
                {displayName}
              </p>
            </div>
          </div>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#475569] hover:bg-[#eef3f8]">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#ef4444]" />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-[rgba(103,204,244,0.12)] blur-3xl" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#6b7280]">총 손익</p>
            <div
              className={
                isPositive
                  ? 'inline-flex items-center gap-1 rounded-lg bg-[#ecfdf5] px-2 py-1 text-xs font-semibold text-[#10b981]'
                  : 'inline-flex items-center gap-1 rounded-lg bg-[#fff1f2] px-2 py-1 text-xs font-semibold text-[#f43f5e]'
              }
            >
              <TrendingUp className="h-3 w-3" />
              {formatPercent(totalProfitRate, { withSign: true, maximumFractionDigits: 1 })}
            </div>
          </div>

          <p className="mt-2 text-xl leading-none font-bold tracking-[-0.03em] text-[#111827]">
            {isPositive ? '+' : '-'}
            {formatKrwAmount(Math.abs(summary.totalProfit))}원
          </p>
          <p className="mt-2 text-xs text-[#9ca3af]">마지막 업데이트: 방금 전</p>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#f3f4f6] bg-white p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full p-1"
            style={ringStyle}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-[#1f2937]">
              {Math.round(winRate)}%
            </div>
          </div>
          <p className="mt-2 text-xs font-medium text-[#6b7280]">승률</p>
        </div>

        <div className="rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(103,204,244,0.2)] text-[#67ccf4]">
            ↗
          </div>
          <p className="mt-3 text-3xl leading-none font-bold text-[#111827]">
            {summary.tradeCount}
          </p>
          <p className="mt-1 text-xs font-medium text-[#6b7280]">이번 주 거래 수</p>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[rgba(103,204,244,0.22)] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xxl flex items-center gap-2 leading-none font-bold tracking-[-0.02em] text-[#111827]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67ccf4]" />
            오늘의 심리
          </h3>
          <Link href={ROUTES.REPORT.INDEX} className="text-xs font-semibold text-[#67ccf4]">
            히스토리
          </Link>
        </div>

        <p className="mt-3 text-sm text-[#6b7280]">거래 전에 지금 감정 상태는 어떤가요?</p>

        <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-1">
          {MINDSET_OPTIONS.map((option) => {
            const isActive = activeMindset === option.code
            return (
              <button
                key={option.code}
                onClick={() => setSelectedMindset(option.code)}
                className={
                  isActive
                    ? 'min-w-[88px] rounded-xl border-2 border-[#67ccf4] bg-[rgba(103,204,244,0.08)] px-4 py-3 text-center'
                    : 'min-w-[88px] rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-center'
                }
              >
                <p className="text-xl">{option.emoji}</p>
                <p
                  className={`mt-1 text-xs font-medium ${isActive ? 'text-[#67ccf4]' : 'text-[#64748b]'}`}
                >
                  {option.label}
                </p>
              </button>
            )
          })}
        </div>

        <Link
          href={ROUTES.JOURNAL.CREATE}
          className="mt-4 block rounded-xl bg-[#67ccf4] py-2.5 text-center text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(103,204,244,0.2),0_2px_4px_-2px_rgba(103,204,244,0.2)]"
        >
          기록하기
        </Link>
      </section>

      <section className="mt-4 rounded-2xl border border-[#f3f4f6] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xxl leading-none font-bold tracking-[-0.02em] text-[#111827]">
            성과 추이
          </h3>
          <div className="inline-flex items-center rounded-lg bg-[#f6f7f8] p-1">
            {TIMEFRAME_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedTimeframe(option)}
                className={
                  selectedTimeframe === option
                    ? 'rounded-md bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                    : 'px-3 py-1 text-xs font-semibold text-[#6b7280]'
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="dashboardTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={trendColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={trendColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <YAxis hide />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <Tooltip
                cursor={false}
                formatter={(value) => [`${formatKrwAmount(Number(value))}원`, '손익']}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke={trendColor}
                strokeWidth={2.5}
                fill="url(#dashboardTrend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-xxl leading-none font-bold tracking-[-0.02em] text-[#111827]">
            최근 거래
          </h3>
          <Link href={ROUTES.JOURNAL.LIST} className="text-xs font-semibold text-[#67ccf4]">
            전체 보기
          </Link>
        </div>

        <div className="space-y-3">
          {recentTrades.length === 0 ? (
            <div className="rounded-2xl border border-[#f1f5f9] bg-white p-5 text-center text-sm text-[#64748b] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              최근 거래 데이터가 없습니다. 첫 기록을 남겨보세요.
            </div>
          ) : (
            recentTrades.map((trade) => {
              const emotion = EMOTION_DATA[trade.primaryEmotion as EmotionType]
              const symbol = emotion?.emoji || '📌'
              const isProfitTrade = trade.realizedProfit >= 0

              return (
                <Link key={trade.id} href={ROUTES.JOURNAL.DETAIL(trade.id)}>
                  <article className="flex items-center justify-between rounded-2xl border border-[#f9fafb] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7ed] text-lg">
                        {symbol}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#111827]">{trade.symbol}</p>
                        <p className="text-xs text-[#6b7280]">
                          {toTradeTime(trade.latestEventCreatedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${isProfitTrade ? 'text-[#10b981]' : 'text-[#ef4444]'}`}
                      >
                        {isProfitTrade ? '+' : '-'}
                        {formatKrwAmount(Math.abs(trade.realizedProfit))}원
                      </p>
                      <p className="inline-flex rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#9ca3af]">
                        {trade.latestEventType}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
