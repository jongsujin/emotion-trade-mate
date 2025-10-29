const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    // packages/ui 컴포넌트도 스캔 (추후 추가)
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue Palette (레퍼런스 기반)
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#90D5FF', // Main primary
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        // Brand Color (기존 유지)
        brand: '#68CCF4',
        // Accent Colors
        accent: {
          blue: '#4E9FF5',
          purple: '#8B5CF6',
          pink: '#EC4899',
          green: '#10B981',
          orange: '#F59E0B',
        },
        // Emotion Colors (개선)
        emotion: {
          joy: '#FCD34D', // 따뜻한 노랑
          fear: '#8B5CF6', // 보라
          greed: '#10B981', // 초록
          anxiety: '#EF4444', // 빨강
          confidence: '#3B82F6', // 파랑
          regret: '#6B7280', // 회색
          neutral: '#9CA3AF', // 연한 회색
        },
        // Background & Surface
        background: {
          primary: '#F8FAFC',
          secondary: '#F1F5F9',
          tertiary: '#E2E8F0',
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          elevated: '#FFFFFF',
        },
        // Text Colors
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        elevated: '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
    },
  },
  plugins: [],
}

export default config
