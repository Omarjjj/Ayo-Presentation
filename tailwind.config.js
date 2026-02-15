/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Presentation colors
        'ayo-dark': '#111017',
        'ayo-charcoal': '#121117',
        'ayo-violet': '#14131A',
        'ayo-indigo': '#1F1D29',
        'ayo-highlight': '#21202C',

        // Demo App colors (merged)
        ayo: {
          bg: '#0d0a14',
          'bg-dark': '#08060d',
          'bg-card': '#13101c',
          'bg-card-hover': '#1a1625',
          border: '#2a2438',
          'border-glow': '#6b5b95',
          purple: '#9d8cff',
          'purple-dim': '#7c6bc4',
          'purple-glow': '#b8a9ff',
          'purple-dark': '#4a3f6b',
          white: '#f5f5f7',
          silver: '#c5c5d2',
          muted: '#6b6880',
          success: '#7dd3a8',
          warning: '#e4c07a',
          error: '#e87b7b',
          info: '#7db3e4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-glow': 'radial-gradient(ellipse at center, rgba(157, 140, 255, 0.15) 0%, transparent 70%)',
        'purple-glow-strong': 'radial-gradient(ellipse at center, rgba(157, 140, 255, 0.25) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(157, 140, 255, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(157, 140, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(157, 140, 255, 0.3)' },
          '50%': { borderColor: 'rgba(157, 140, 255, 0.6)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(157, 140, 255, 0.2)',
        'glow-md': '0 0 30px rgba(157, 140, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(157, 140, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(157, 140, 255, 0.5)',
        'inner-glow': 'inset 0 0 30px rgba(157, 140, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
