/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4285F4',
          DEFAULT: '#1A73E8',
          dark: '#0D47A1',
        },
        danger: {
          light: '#F28B82',
          DEFAULT: '#D93025',
          dark: '#B31412',
        },
        success: {
          light: '#81C995',
          DEFAULT: '#34A853',
          dark: '#188038',
        },
        warning: {
          light: '#FDD663',
          DEFAULT: '#F9A825',
          dark: '#E37400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'elevation-2': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
        'elevation-3': '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
      },
    },
  },
  plugins: [],
}