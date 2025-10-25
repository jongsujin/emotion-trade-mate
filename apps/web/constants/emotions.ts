/**
 * 감정 타입 상수
 * EmotionTrade의 핵심 감정 카테고리 정의
 */

export const EMOTIONS = {
  JOY: 'joy',
  FEAR: 'fear',
  GREED: 'greed',
  ANXIETY: 'anxiety',
  CONFIDENCE: 'confidence',
  REGRET: 'regret',
  NEUTRAL: 'neutral',
} as const

export type EmotionType = (typeof EMOTIONS)[keyof typeof EMOTIONS]

export interface Emotion {
  id: EmotionType
  emoji: string
  label: string
  color: string
}

/**
 * 감정 데이터 매핑
 */
export const EMOTION_DATA: Record<EmotionType, Emotion> = {
  [EMOTIONS.JOY]: {
    id: EMOTIONS.JOY,
    emoji: '😊',
    label: '기쁨',
    color: '#FFD93D',
  },
  [EMOTIONS.FEAR]: {
    id: EMOTIONS.FEAR,
    emoji: '😰',
    label: '두려움',
    color: '#6C63FF',
  },
  [EMOTIONS.GREED]: {
    id: EMOTIONS.GREED,
    emoji: '🤑',
    label: '욕심',
    color: '#4CAF50',
  },
  [EMOTIONS.ANXIETY]: {
    id: EMOTIONS.ANXIETY,
    emoji: '😟',
    label: '불안',
    color: '#FF6B6B',
  },
  [EMOTIONS.CONFIDENCE]: {
    id: EMOTIONS.CONFIDENCE,
    emoji: '😎',
    label: '자신감',
    color: '#68CCF4',
  },
  [EMOTIONS.REGRET]: {
    id: EMOTIONS.REGRET,
    emoji: '😞',
    label: '후회',
    color: '#95A5A6',
  },
  [EMOTIONS.NEUTRAL]: {
    id: EMOTIONS.NEUTRAL,
    emoji: '😐',
    label: '중립',
    color: '#BDC3C7',
  },
}

/**
 * 감정 리스트 (정렬된 배열)
 */
export const EMOTION_LIST = Object.values(EMOTION_DATA)
