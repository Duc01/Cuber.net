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
	async getLocalScores() {
		let allTimes = []
		let timesList = []
		let promises = []
		await localforage.iterate((score) => {
			allTimes.push(score)
		})
		for (let i = 0; i < 12; i++) {
			try {
				timesList.push({
					time: allTimes[i].time,
					timestamp: allTimes[i].timestamp
				})
			} catch (error) {
				allTimes = []
				allTimes.forEach((time) => {
					timesList.push({
						time: time.time,
						timestamp: time.timestamp
					})
				})
			}
		}
		return timesList
	}
}
