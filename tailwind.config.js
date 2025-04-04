/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        'tech-dark': '#0a0a0a',
        'tech-gray': '#1a1a1a',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s infinite',
      },
    },
  },
  plugins: [],
};