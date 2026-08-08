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

const ctx = document.querySelector('#scores-chart')

new Chart(ctx, {
	type: 'line',
	data: {
		labels: scores.map((_, index) => index + 1),
		datasets: [
			{
				label: 'Time',
				data: scores.map(row => row.timeSecs),
				borderWidth: 3,
				fill: true,
				backgroundColor: 'rgba(0, 255, 0, 0.2)',
				borderColor: 'rgba(0, 255, 0, 0.8)',
				tension: 0.7
			}
		]
	}
})
const allScoresChart = new Chart('scores-chart', {
	type: 'line',
	data: {
		datasets: [
			{
				label: 'Time',
				data: scores.map(row => row.timeSecs),
				borderWidth: 5,
				fill: true,
				backgroundColor: 'rgba(0, 255, 0, 1)',
				tension: 0.7
			}
		]
	}
})

// ;(async function () {
// 	new Chart(document.querySelector('#scores-chart'), {
// 		type: 'line',
// 		data: scores.timeSecs
// 	})
// })()
// keys.forEach(async (key) => {
//   await localforage.getItem(key, (err, value) => {
//     scores.push(value)
//   })
// })
// console.log(scores)

// ;(async function () {
// 	const data = [
// 		{ year: 2010, count: 10 },
// 		{ year: 2011, count: 20 },
// 		{ year: 2012, count: 15 },
// 		{ year: 2013, count: 25 },
// 		{ year: 2014, count: 22 },
// 		{ year: 2015, count: 30 },
// 		{ year: 2016, count: 28 }
// 	]

// 	new Chart(document.querySelector('#scores-chart'), {
// 		type: 'bar',
// 		data: {
// 			labels: data.map((row) => row.year),
// 			datasets: [
// 				{
// 					label: 'Acquisitions by year',
// 					data: data.map((row) => row.count)
// 				}
// 			]
// 		}
// 	})
// })()
