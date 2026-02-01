'use client'

import { Card } from '@/components/common/Card'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import {
  TrendingUp,
  Brain,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  TrendingDown,
} from 'lucide-react'

// Mock Data for Prototype
const MOCK_ASSET_DATA = [
  { date: '1일', value: 1000000 },
  { date: '5일', value: 1050000 },
  { date: '10일', value: 1030000 },
  { date: '15일', value: 1120000 },
  { date: '20일', value: 1080000 },
  { date: '25일', value: 1250000 },
  { date: '오늘', value: 1320000 },
]

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
  const currentProfit = 320000
  const profitRate = 32.0
  const isPositive = currentProfit >= 0

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* 1. 자산 현황 (Asset Overview) */}
      <motion.section variants={item}>
        <h2 className="mb-4 text-xl font-bold text-gray-800">내 자산</h2>
        <Card className="relative overflow-hidden p-0!">
          <div className="p-6 pb-0">
            <span className="text-sm font-medium text-gray-500">이번 달 수익</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {currentProfit.toLocaleString()}원
              </span>
              <span
                className={`flex items-center text-sm font-bold ${
                  isPositive ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {profitRate}%
              </span>
            </div>
          </div>

          <div className="mt-4 h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ASSET_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB7185" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  itemStyle={{ color: '#E11D48', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#E11D48" // Rose-600
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
          <button className="text-sm font-medium text-gray-400 hover:text-gray-600">더보기</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center gap-3 bg-linear-to-br from-blue-50 to-white py-8">
            <div className="text-5xl">🌤️</div>
            <div className="text-center">
              <span className="block text-sm text-gray-500">오늘의 감정</span>
              <span className="text-lg font-bold text-blue-600">평온함</span>
            </div>
          </Card>
          <Card className="flex flex-col justify-between bg-white p-5">
            <div>
              <span className="block text-sm text-gray-500">승률 분석</span>
              <span className="text-lg font-bold text-gray-900">
                평온할 때
                <br />
                <span className="text-blue-600">83% 승리</span>
              </span>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Brain className="h-8 w-8 text-blue-100" />
            </div>
          </Card>
        </div>
      </motion.section>

      {/* 3. AI 인사이트 (Insight) */}
      <motion.section variants={item}>
        <Card className="group relative overflow-hidden bg-black text-white transition-all hover:bg-gray-900">
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-2">
              <AlertCircle className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-bold text-yellow-300">AI Warning</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                최근 <strong>&apos;불안&apos;</strong> 감정이 감지될 때마다 평균{' '}
                <span className="text-red-400">-5.2%</span> 손실이 발생했어요. 오늘은 매매를
                쉬어보는 건 어떨까요?
              </p>
              <button className="flex items-center text-sm font-bold text-white/80 transition-colors group-hover:text-white">
                자세히 보기 <ChevronRight className="ml-1 h-4 w-4" />
              </button>
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
