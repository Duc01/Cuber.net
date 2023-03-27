/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**.html'],
  theme: {
    extend: {
      colors: {
        'background-main': '#282523',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'primary-grid': '18.5vw 1fr',
      }
    },
  },
  plugins: [],
}
