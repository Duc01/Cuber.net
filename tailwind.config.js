/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./public/**.html',
		'./public/dist/home.bundle.js',
		'./public/dist/login.bundle.js'
	],
	theme: {
		extend: {
			colors: {
				text: '#F9E5D7',
				'background-main': '#282523',
				'side-menu': '#211E1E',
				primary: '#C07F24',
				secondary: '#7D9C16',
				'secondary-hover': '#586F0E',
				nav: '#363230'
			},
			gridTemplateColumns: {
				// Simple 16 column grid
				'primary-grid': '18.5vw 1fr'
			},
			fontFamily: {
				spacemono: ['Space Mono', 'monospace'],
				jetbrainsmono: ['JetBrains Mono', 'monospace']
			}
		}
	},
	plugins: []
}
