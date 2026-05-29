/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF8E7',
          100: '#FFE8C4',
          200: '#FFD89E',
          300: '#E67E22',
          400: '#D35400',
          500: '#A0522D',
          600: '#8B4513',
          700: '#704214',
          800: '#5D4037',
          900: '#3E2723',
        },
        warm: {
          white: '#FFF8E7',
          cream: '#FFF5E6',
          beige: '#F5E6D3',
          gold: '#D4A574',
          brown: '#5D4037',
        },
        accent: {
          orange: '#E67E22',
          amber: '#F59E0B',
          rust: '#B7410E',
        },
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'serif'],
        sans: ['Noto Sans SC', 'Source Han Sans SC', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'paper-crane': 'paperCrane 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        paperCrane: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(-50px) rotate(15deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) rotate(30deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFF8E7 0%, #FFE8C4 50%, #E67E22 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(93,64,55,0.8) 0%, rgba(230,126,34,0.6) 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFF8E7 0%, #FFF5E6 100%)',
      },
    },
  },
  plugins: [],
};