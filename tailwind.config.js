/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Indigo
        'primary-dark': '#4338ca',
        secondary: '#ec4899', // Pink
        'secondary-dark': '#db2777',
        'tertiary': '#8b5cf6', // Purple
        'tertiary-dark': '#7c3aed',
        'accent': '#06b6d4', // Cyan
        'accent-dark': '#0891b2',
        'success': '#10b981', // Emerald
        'success-dark': '#059669',
        'warning': '#f59e0b', // Amber
        'warning-dark': '#d97706',
        'error': '#ef4444', // Red
        'error-dark': '#dc2626',
        'web3': {
          'blue': '#3b82f6',
          'purple': '#8b5cf6',
          'pink': '#ec4899',
          'cyan': '#06b6d4',
          'emerald': '#10b981',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 15s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(255 255 255 / 0.05)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e')",
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary), 0 0 20px theme(colors.primary)',
        'neon-secondary': '0 0 5px theme(colors.secondary), 0 0 20px theme(colors.secondary)',
        'neon-tertiary': '0 0 5px theme(colors.tertiary), 0 0 20px theme(colors.tertiary)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}