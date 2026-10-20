import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Colors: Elegant Carmine Red, Black, Grey
        brand: {
          red: {
            DEFAULT: '#C0262D',
            dark: '#8B1E23',
            // WCAG AA (4.5:1) over white for small text and links
            accessible: '#A81F25',
            // WCAG AA (4.5:1) over the dark hero background
            onDark: '#E04A50',
            50: '#FDF2F2',
            100: '#FDE8E8',
            200: '#FBD5D5',
            300: '#F8B4B4',
            400: '#F05252',
            500: '#C0262D',
            600: '#9B1C1C',
            700: '#771D1D',
            800: '#551B1B',
            900: '#311313',
          },
          black: {
            DEFAULT: '#0A0A0A',
            50: '#F5F5F5',
            100: '#E0E0E0',
            200: '#BDBDBD',
            300: '#9E9E9E',
            400: '#757575',
            500: '#4A4A4A',
            600: '#2E2E2E',
            700: '#1A1A1A',
            800: '#0F0F0F',
            900: '#0A0A0A',
          },
          grey: {
            DEFAULT: '#71727A',
            50: '#F7F7F8',
            100: '#E4E4E7',
            200: '#CACACE',
            300: '#A8A9B0',
            400: '#8E8F96',
            500: '#71727A',
            600: '#5A5B62',
            700: '#43444A',
            800: '#2C2D32',
            900: '#1A1B1E',
          },
        },
        // Neutral Palette (matching rebranding design)
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F4F3EE',
          200: '#E5E5E5',
          300: '#C7C5BB',
          400: '#A3A199',
          500: '#78766F',
          600: '#525252',
          700: '#404040',
          800: '#2B2B29',
          900: '#171716',
          950: '#0E0E0E',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#065F46',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Oswald', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Precise typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'red': '0 10px 30px -5px rgb(192 38 45 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        // Rebranding animations
        'bg-in': 'bgIn 1.1s ease-out forwards',
        'grid-in': 'gridIn 1s ease-out 3s forwards',
        'impact-in': 'impactIn 0.9s cubic-bezier(.2,.8,.25,1) 2s forwards',
        'ring-pulse': 'ringPulse 4.5s ease-in-out infinite',
        'product-in': 'productIn 1s cubic-bezier(.16,.9,.3,1) 1s forwards',
        'idle-float': 'idleFloat 6s ease-in-out 2s infinite',
        'tick-in': 'tickIn 0.6s ease-out forwards',
        'content-in': 'contentIn 0.9s ease-out 0.35s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Rebranding keyframes
        bgIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        gridIn: {
          from: { opacity: '0' },
          to: { opacity: '0.35' },
        },
        impactIn: {
          from: { opacity: '0', transform: 'translate(0, -50%) scale(0.85)' },
          to: { opacity: '1', transform: 'translate(0, -50%) scale(1)' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.18', transform: 'scale(1.06)' },
        },
        productIn: {
          from: { opacity: '0', transform: 'translateX(40px) scale(0.94)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        idleFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0.6deg)' },
        },
        tickIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        contentIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
