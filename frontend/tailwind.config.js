/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: {
          50:  '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ece0',
          300: '#ead8c0',
        },
        navy: {
          700: '#162850',
          800: '#0f1f3d',
          900: '#080f1e',
          950: '#040a14',
        },
        gold: {
          300: '#f9df8a',
          400: '#f5c842',
          500: '#e8b800',
          600: '#c49a00',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'float':      'float 6s ease-in-out infinite',
        'bounce-slow':'bounceSlow 2.2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' },                                    to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(24px)' },     to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown:  { from: { opacity: '0', transform: 'translateY(-12px)' },    to: { opacity: '1', transform: 'translateY(0)' } },
        float:      { '0%, 100%': { transform: 'translateY(0px)' },              '50%': { transform: 'translateY(-10px)' } },
        bounceSlow: { '0%, 100%': { transform: 'translateY(0)' },                '50%': { transform: 'translateY(7px)' } },
        pulseSoft:  { '0%, 100%': { opacity: '0.6' },                            '50%': { opacity: '1' } },
        shimmer:    { to: { backgroundPosition: '-200% 0' } },
      },
      transitionDuration: { 400: '400ms' },
    },
  },
  plugins: [],
}
