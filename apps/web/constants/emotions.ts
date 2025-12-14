/**
 * 감정 타입 상수 (서버 emotion_tags 테이블과 동기화)
 * EmotionTrade의 핵심 감정 카테고리 정의
 */

export const EMOTIONS = {
  // 기본 감정
  FEAR: 'FEAR',
  GREED: 'GREED',

  // 자신감 & 확신
  CONFIDENT: 'CONFIDENT',
  DOUBT: 'DOUBT',

  // 희망 & 절망
  HOPE: 'HOPE',
  DESPAIR: 'DESPAIR',

  // 흥분 & 불안
  EXCITED: 'EXCITED',
  ANXIOUS: 'ANXIOUS',

  // 만족 & 후회
  SATISFIED: 'SATISFIED',
  REGRET: 'REGRET',

  // 정서 상태
  ANGRY: 'ANGRY',
  CALM: 'CALM',
  STRESSED: 'STRESSED',
  RELAXED: 'RELAXED',

  // 전망
  OPTIMISTIC: 'OPTIMISTIC',
  PESSIMISTIC: 'PESSIMISTIC',

  // 의사결정
  IMPULSIVE: 'IMPULSIVE',
  CAUTIOUS: 'CAUTIOUS',
  PANIC: 'PANIC',
  RATIONAL: 'RATIONAL',

  // 극단 감정
  EXTREME_GREED: 'EXTREME_GREED',
  EXTREME_FEAR: 'EXTREME_FEAR',

  // 장기 감정
  LONG_TERM_CONFIDENCE: 'LONG_TERM_CONFIDENCE',
  SHORT_TERM_DOUBT: 'SHORT_TERM_DOUBT',
} as const

export type EmotionType = (typeof EMOTIONS)[keyof typeof EMOTIONS]

export interface Emotion {
  id: EmotionType
  emoji: string
  label: string
  color: string
}

/**
 * 감정 데이터 매핑 (서버 emotion_tags와 동기화)
 */
export const EMOTION_DATA: Record<EmotionType, Emotion> = {
  // 기본 감정
  [EMOTIONS.FEAR]: {
    id: EMOTIONS.FEAR,
    emoji: '😨',
    label: '공포',
    color: '#6C63FF',
  },
  [EMOTIONS.GREED]: {
    id: EMOTIONS.GREED,
    emoji: '🤑',
    label: '탐욕',
    color: '#4CAF50',
  },

  // 자신감 & 확신
  [EMOTIONS.CONFIDENT]: {
    id: EMOTIONS.CONFIDENT,
    emoji: '😎',
    label: '자신감',
    color: '#68CCF4',
  },
  [EMOTIONS.DOUBT]: {
    id: EMOTIONS.DOUBT,
    emoji: '🤔',
    label: '의심',
    color: '#FFA726',
  },

  // 희망 & 절망
  [EMOTIONS.HOPE]: {
    id: EMOTIONS.HOPE,
    emoji: '🌟',
    label: '희망',
    color: '#FFD93D',
  },
  [EMOTIONS.DESPAIR]: {
    id: EMOTIONS.DESPAIR,
    emoji: '😢',
    label: '절망',
    color: '#757575',
  },

  // 흥분 & 불안
  [EMOTIONS.EXCITED]: {
    id: EMOTIONS.EXCITED,
    emoji: '🤩',
    label: '흥분',
    color: '#FF5722',
  },
  [EMOTIONS.ANXIOUS]: {
    id: EMOTIONS.ANXIOUS,
    emoji: '😟',
    label: '불안',
    color: '#FF6B6B',
  },

  // 만족 & 후회
  [EMOTIONS.SATISFIED]: {
    id: EMOTIONS.SATISFIED,
    emoji: '😊',
    label: '만족',
    color: '#4CAF50',
  },
  [EMOTIONS.REGRET]: {
    id: EMOTIONS.REGRET,
    emoji: '😞',
    label: '후회',
    color: '#95A5A6',
  },

  // 정서 상태
  [EMOTIONS.ANGRY]: {
    id: EMOTIONS.ANGRY,
    emoji: '😠',
    label: '분노',
    color: '#F44336',
  },
  [EMOTIONS.CALM]: {
    id: EMOTIONS.CALM,
    emoji: '😌',
    label: '평온',
    color: '#81C784',
  },
  [EMOTIONS.STRESSED]: {
    id: EMOTIONS.STRESSED,
    emoji: '😰',
    label: '스트레스',
    color: '#FF9800',
  },
  [EMOTIONS.RELAXED]: {
    id: EMOTIONS.RELAXED,
    emoji: '😌',
    label: '안정',
    color: '#4DB6AC',
  },

  // 전망
  [EMOTIONS.OPTIMISTIC]: {
    id: EMOTIONS.OPTIMISTIC,
    emoji: '😃',
    label: '낙관적',
    color: '#FFD54F',
  },
  [EMOTIONS.PESSIMISTIC]: {
    id: EMOTIONS.PESSIMISTIC,
    emoji: '😔',
    label: '비관적',
    color: '#78909C',
  },

  // 의사결정
  [EMOTIONS.IMPULSIVE]: {
    id: EMOTIONS.IMPULSIVE,
    emoji: '💨',
    label: '충동적',
    color: '#E91E63',
  },
  [EMOTIONS.CAUTIOUS]: {
    id: EMOTIONS.CAUTIOUS,
    emoji: '🤝',
    label: '신중한',
    color: '#2196F3',
  },
  [EMOTIONS.PANIC]: {
    id: EMOTIONS.PANIC,
    emoji: '😱',
    label: '패닉',
    color: '#9C27B0',
  },
  [EMOTIONS.RATIONAL]: {
    id: EMOTIONS.RATIONAL,
    emoji: '🧠',
    label: '냉정한',
    color: '#607D8B',
  },

  // 극단 감정
  [EMOTIONS.EXTREME_GREED]: {
    id: EMOTIONS.EXTREME_GREED,
    emoji: '💰',
    label: '극심한 탐욕',
    color: '#388E3C',
  },
  [EMOTIONS.EXTREME_FEAR]: {
    id: EMOTIONS.EXTREME_FEAR,
    emoji: '😱',
    label: '극심한 공포',
    color: '#3F51B5',
  },

  // 장기 감정
  [EMOTIONS.LONG_TERM_CONFIDENCE]: {
    id: EMOTIONS.LONG_TERM_CONFIDENCE,
    emoji: '🎯',
    label: '장기적 자신감',
    color: '#009688',
  },
  [EMOTIONS.SHORT_TERM_DOUBT]: {
    id: EMOTIONS.SHORT_TERM_DOUBT,
    emoji: '⏰',
    label: '단기적 의심',
    color: '#FF9800',
  },
}

/**
 * 감정 리스트 (정렬된 배열)
 */
export const EMOTION_LIST = Object.values(EMOTION_DATA)
