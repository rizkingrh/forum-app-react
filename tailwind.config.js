/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0a0d14',
          card: 'rgba(22, 28, 45, 0.4)',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#8b5cf6', // Violet
          cyan: '#06b6d4', // Cyan
          textMuted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-slow': 'glow 8s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -50px) scale(1.2)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.8)' },
        }
      }
    },
  },
  plugins: [],
};
