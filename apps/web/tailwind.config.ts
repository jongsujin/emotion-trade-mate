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
        // Brand Colors (Pastel Tone)
        primary: {
          50: '#EFF6FF', // Very light blue
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#6C9EFF', // Main Brand Color (Soft Blue)
          600: '#4B82F0',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Gray Scale (Soft)
        gray: {
          50: '#FAFAFA',
          100: '#F4F5F7', // Main Background
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Status Colors (Pastel)
        status: {
          up: '#FF6B6B', // Soft Red
          upBg: '#FFF0F0', // Very light red
          down: '#6C9EFF', // Soft Blue
          downBg: '#F0F7FF', // Very light blue
        },
        // Emotion Colors (Pastel)
        emotion: {
          joy: '#FCD34D', // Soft Yellow
          fear: '#A78BFA', // Soft Purple
          greed: '#34D399', // Soft Green
          anxiety: '#F87171', // Soft Red
          confidence: '#60A5FA', // Soft Blue
          regret: '#9CA3AF', // Soft Gray
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
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        card: '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
}

export default config
