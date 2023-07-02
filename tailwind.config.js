/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**.html', './public/dist/**.js'],
	theme: {
		extend: {
			colors: {
				'background-main': '#282523',
				'side-menu': '#50433a',
				nav: '#363230'
			},
			gridTemplateColumns: {
				// Simple 16 column grid
				'primary-grid': '18.5vw 1fr'
			}
		}
	},
	plugins: []
}
