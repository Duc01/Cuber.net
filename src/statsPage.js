import Chart from 'chart.js/auto'
import localforage from 'localforage'

const keys = await localforage.keys()
let scores = []
for (let i = 0; i < keys.length; i++) {
	await localforage.getItem(keys[i], (err, value) => {
		scores.push(value)
	})
}
console.log(scores)

// Chart displaying all scores
const rawScores = document.querySelector('#scores-chart')
new Chart(rawScores, {
	type: 'line',
	data: {
		labels: scores.map((_, index) => index + 1),
		datasets: [
			{
				label: 'Times',
				data: scores.map(row => row.timeSecs),
				borderWidth: 3,
				fill: true,
				backgroundColor: 'rgba(0, 255, 0, 0.2)',
				borderColor: 'rgba(0, 255, 0, 0.8)',
				tension: 0.2,
				cubicInterpolationMode: 'default',
			}
		]
	},
	options: {
		scales: {
			x: {
				display: false
			}
		}
	}
})
