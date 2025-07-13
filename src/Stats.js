import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query
} from 'firebase/firestore'
import localforage from 'localforage'

export class Stats {
	/**
	 * @param {string | null} firebaseUID - The Firebase user ID.
	 */
	constructor(firebaseUID) {
		this.firebaseUID = firebaseUID
	}

	// async readFirebaseScores(firebaseUID) {
	// 	let timesList = []
	// 	// duplication of work with onAuthStateChange in home.js
	// 	const docsSnap = await getDocs(
	// 		query(
	// 			collection(doc(db, 'users', firebaseUID), 'scores'),
	// 			orderBy('timestamp', 'desc'),
	// 			limit(12)
	// 		)
	// 	)
	// 	docsSnap.forEach((doc) => {
	// 		timesList.push({
	// 			time: doc.data().time,
	// 			timestamp: doc.data().timestamp
	// 		})
	// 	})
	// 	return timesList
	// }

	// PLEASE FOR THE LOVE OF GOD USE AWAIT WHEN CALLING THIS FUNCTION
	// This bitch ass library can only get items in ascending order when using localforage.iterate(), not descending because that would make too much sense
	/**
	 *
	 * @param {Number} limit
	 * @returns Array
	 */
	async getLocalScores(limit) {
		let allTimes = []
		let scoresList = []
		const keys = await localforage.keys()
		const scoreCount = keys.length
		if (scoreCount >= limit) {
			for (let i = 0; i < limit; i++) {
				scoresList.push(
					await localforage.getItem(keys[scoreCount - (1 + i)])
				)
			}
		} else if (scoreCount < limit) {
			for (let i = 0; i < scoreCount; i++) {
				scoresList.unshift(await localforage.getItem(keys[i]))
			}
		}
		return scoresList
	}

	/**
	 *
	 * @param {any[]} scoreArr
	 * @returns {string}
	 */
	calculateAvgTime(scoreArr) {
		let times = []
		scoreArr.forEach((score) => {
			times.push(score.time)
		})
		// dawg I don't know this
		const timesInSec = times.map((time) => {
			let pieces = time.split(':')
			switch (pieces.length) {
				case 3: // HH:MM:SS
					let hours = parseInt(pieces[0], 10)
					let minutes = parseInt(pieces[1], 10) + hours * 60
					return minutes * 60 + parseFloat(pieces[2])
				case 2: // MM:SS
					let mins = parseInt(pieces[0], 10)
					return mins * 60 + parseFloat(pieces[1])
				default: // SS (or invalid, but we'll treat it as seconds)
					return parseFloat(pieces[0])
			}
		})

		const totalSeconds = timesInSec.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		)
		const averageInSec = totalSeconds / timesInSec.length

		let avgTime = new Date(0)
		avgTime.setMilliseconds(averageInSec * 1000)
		const avgTimeString = avgTime.toISOString().substring(14, 22)
		return avgTimeString
	}

	async getAvgOfScores(limit) {
		const scoreArr = await this.getLocalScores(limit)
		console.log(scoreArr)

		const calculatedAvg = this.calculateAvgTime(scoreArr)
		return calculatedAvg
	}
}
