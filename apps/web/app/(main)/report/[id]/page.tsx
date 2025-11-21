'use client'

import {
  ReportEmotions,
  ReportStockInfo,
  ReportEmotionBreakdown,
  ReportKeywords,
  ReportMemoTimeline,
  ReportAIInsights,
  ReportPdfDownload,
} from '@/components/report/detail'
import { MOCK_REPORT } from '@/constants/reports'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import TitleSection from '@/components/common/TitleSection'

/**
 * AI 리포트 상세 페이지
 */
export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-24">
      <div className="sticky top-0 z-10 bg-[#F4F5F7]/90 backdrop-blur-md">
        <TitleSection title={`${MOCK_REPORT.symbol} 리포트`} onClick={() => router.back()} />
      </div>

      <div className="space-y-4 px-5 pt-2">
        {/* 종목 정보 */}
        <ReportStockInfo
          emoji={MOCK_REPORT.emoji}
          symbol={MOCK_REPORT.symbol}
          returnRate={MOCK_REPORT.returnRate}
          profit={MOCK_REPORT.profit}
          period={MOCK_REPORT.period}
          totalRecords={MOCK_REPORT.totalRecords}
          symbolName={MOCK_REPORT.symbolName}
        />

        {/* 주요 감정 */}
        <ReportEmotions
          dominantEmoji={MOCK_REPORT.dominantEmoji}
          dominantEmotion={MOCK_REPORT.dominantEmotion}
          percentage={MOCK_REPORT.emotionBreakdown[0]?.percentage || 0}
        />

        {/* 감정 분포 */}
        <ReportEmotionBreakdown emotionBreakdown={MOCK_REPORT.emotionBreakdown} />

        {/* 자주 쓴 키워드 */}
        <ReportKeywords keywords={MOCK_REPORT.keywords} />

        {/* 메모 타임라인 */}
        <ReportMemoTimeline memoTimeline={MOCK_REPORT.memoTimeline} />

        {/* AI 인사이트 */}
        <ReportAIInsights insights={MOCK_REPORT.insights} />

        {/* 리포트 다운로드 */}
        <ReportPdfDownload />
      </div>
    </div>
  )
}
