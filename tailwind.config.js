/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F1FF',
          100: '#E6E2FF',
          200: '#D1CAFF',
          300: '#B8ADFF',
          400: '#9C8CFF',
          500: '#5B4FDB',
          600: '#4C3FBA',
          700: '#3E3399',
          800: '#2F2778',
          900: '#201B57',
        },
        secondary: {
          50: '#F5F4FF',
          100: '#EBEAFF',
          200: '#DDD9FF',
          300: '#CFC4FF',
          400: '#BFABFF',
          500: '#8B7FFF',
          600: '#7C6CFF',
          700: '#6B58FF',
          800: '#5A45E6',
          900: '#4932CC',
        },
        accent: {
          50: '#FFF2F2',
          100: '#FFE5E5',
          200: '#FFB8B8',
          300: '#FF8A8A',
          400: '#FF6B6B',
          500: '#FF4444',
          600: '#E63939',
          700: '#CC2E2E',
          800: '#B32323',
          900: '#991818',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'button': '0 2px 4px rgba(91, 79, 219, 0.2)',
        'button-hover': '0 4px 8px rgba(91, 79, 219, 0.3)',
      },
      animation: {
        'bounce-light': 'bounce 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}