/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        customBlue: '#3EA0C6',
        customDarkBlue: '#20576D',
        darkGray: '#444445',
        selectedOrange: '#FC611D',
        unselectedGray: '#AFAFAF',
        borderLightGray: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
