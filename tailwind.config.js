/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Existing content...
theme: {
  extend: {
    fontFamily: {
      'manrope': ['Manrope', 'sans-serif'],
    },
    colors: { // Add this block
      customBlue: '#3EA0C6',
    },
  },
},
// Existing content...

  plugins: [],
};
