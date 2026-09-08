import Chart from 'chart.js/auto'
import localforage from 'localforage'
import { ScoreManager } from './ScoreManager'

const puzzleType = document.querySelector('#puzzle-changer')

const manager = new ScoreManager();
const scores = await manager.getReleventScores(puzzleType.value);
console.log(scores)

const config = {
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
}
// Chart displaying all scores
const rawScores = document.querySelector('#scores-chart')
let chart = new Chart(rawScores, config)

puzzleType.addEventListener('input', async (_e) => {
	const scores = await manager.getReleventScores(puzzleType.value);
	chart.data.labels = scores.map((_, index) => index + 1)
	chart.data.datasets.data = scores.map(row => row.timeSecs)

	chart.update()
})
