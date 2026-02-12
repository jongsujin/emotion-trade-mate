const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          50: '#ECF9FE',
          100: '#D6F1FC',
          200: '#ACE3FA',
          300: '#84D6F7',
          400: '#68CCF4',
          500: '#43B8E6',
          600: '#2797C2',
          700: '#1F7698',
          800: '#1F5F79',
          900: '#1F5065',
        },

        // Backward-compatible alias
        primary: {
          50: '#ECF9FE',
          100: '#D6F1FC',
          200: '#ACE3FA',
          300: '#84D6F7',
          400: '#68CCF4',
          500: '#43B8E6',
          600: '#2797C2',
          700: '#1F7698',
          800: '#1F5F79',
          900: '#1F5065',
        },

        surface: {
          base: '#F6F9FC',
          card: '#FFFFFF',
          muted: '#EAF0F6',
        },

        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
        },

        border: {
          DEFAULT: '#DCE6F0',
          strong: '#BFCFE0',
        },

        // Gray Scale
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },

        // Status Colors
        status: {
          up: '#EA5B5B',
          upBg: '#FFF2F2',
          down: '#4F9CE8',
          downBg: '#F0F8FF',
          warn: '#F59E0B',
          warnBg: '#FFF7E8',
        },

        // Emotion Colors
        emotion: {
          joy: '#F6C84F',
          fear: '#87A5FF',
          greed: '#3CCF95',
          anxiety: '#F97F7F',
          confidence: '#57B8EA',
          regret: '#9AA8B7',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 4px 14px rgba(15, 23, 42, 0.05)',
        card: '0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config
