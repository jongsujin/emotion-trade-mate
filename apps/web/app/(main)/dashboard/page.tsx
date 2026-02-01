'use client'

import { Card } from '@/components/common/Card'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Brain, AlertCircle, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '@/features/report/api'

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })

  // Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-64 rounded-3xl bg-gray-200" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 rounded-3xl bg-gray-200" />
          <div className="h-40 rounded-3xl bg-gray-200" />
        </div>
      </div>
    )
  }

  const dashboardData = response?.data

  if (!dashboardData) return null

  const { summary, recentTrend, todayEmotion } = dashboardData
  const isPositive = summary.totalProfit >= 0

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* 1. 자산 현황 (Asset Overview) */}
      <motion.section variants={item}>
        <h2 className="mb-4 text-xl font-bold text-gray-800">내 자산</h2>
        <Card className="relative overflow-hidden p-0!">
          <div className="p-6 pb-0">
            <span className="text-sm font-medium text-gray-500">총 누적 손익</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {summary.totalProfit.toLocaleString()}원
              </span>
              {/* 수익률 계산 로직이 필요하다면 추가 */}
            </div>
          </div>

          <div className="mt-4 h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recentTrend}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isPositive ? '#EF4444' : '#3B82F6'}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? '#EF4444' : '#3B82F6'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  itemStyle={{ color: isPositive ? '#EF4444' : '#3B82F6', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke={isPositive ? '#EF4444' : '#3B82F6'}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.section>

      {/* 2. 감정 기상청 (Emotion Weather) */}
      <motion.section variants={item}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">감정 기상청</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center gap-3 bg-linear-to-br from-blue-50 to-white py-8">
            <div className="text-5xl">{todayEmotion ? '🌤️' : '☁️'}</div>
            <div className="text-center">
              <span className="block text-sm text-gray-500">오늘의 감정</span>
              <span className="text-lg font-bold text-blue-600">
                {todayEmotion ? todayEmotion.label : '기록 없음'}
              </span>
            </div>
          </Card>
          <Card className="flex flex-col justify-between bg-white p-5">
            <div>
              <span className="block text-sm text-gray-500">전체 승률</span>
              <span className="text-lg font-bold text-gray-900">
                <span className="text-blue-600">{summary.winRate}%</span> 승리
              </span>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Brain className="h-8 w-8 text-blue-100" />
            </div>
          </Card>
        </div>
      </motion.section>

      {/* 3. AI 인사이트 (Insight) - 데이터 연동 전 정적 표시 */}
      <motion.section variants={item}>
        <Card className="group relative overflow-hidden bg-black text-white transition-all hover:bg-gray-900">
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-2">
              <AlertCircle className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-bold text-yellow-300">AI Insight</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                아직 충분한 데이터가 쌓이지 않았습니다.
                <br />
                꾸준히 일지를 기록하여 패턴을 분석해보세요!
              </p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* 4. 최근 활동 (Activity) - Simple List */}
      <motion.section variants={item}>
        <h2 className="mb-4 text-xl font-bold text-gray-800">최근 활동</h2>
        <Card padding="none" className="divide-y divide-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
                  {i === 1 ? '🚀' : i === 2 ? '😱' : '💎'}
                </div>
                <div>
                  <p className="font-bold text-gray-900">삼성전자 매수</p>
                  <p className="text-xs text-gray-500">오후 2:30 · 기대됨</p>
                </div>
              </div>
              <span className="font-bold text-red-500">+12%</span>
            </div>
          ))}
          <div className="p-3 text-center">
            <button className="flex w-full items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-700">
              전체 내역 보기 <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </Card>
      </motion.section>
    </motion.div>
  )
}
