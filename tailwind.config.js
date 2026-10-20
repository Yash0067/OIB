/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#030303',
        charcoal: '#050505',
        surface: {
          DEFAULT: '#0A0A0C',
          muted: '#111116',
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.15)',
        },
        sony: {
          blue: '#0050FF',
          cyan: '#00D6FF',
          darkBlue: '#002680',
          glow: 'rgba(0, 80, 255, 0.25)',
          cyanGlow: 'rgba(0, 214, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'monospace'
        ]
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(circle at 50% 50%, #080C1E 0%, #030303 70%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(0, 80, 255, 0.12) 0%, transparent 60%)',
        'sony-gradient': 'linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
