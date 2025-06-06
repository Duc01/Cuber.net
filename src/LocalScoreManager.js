import localforage from 'localforage'
import { Timer } from './Timer'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from './index'

export class LocalScoreManager {
	/**
	 * @param myTimer {Timer}
	 */
	displayLocalScores(myTimer) {
		localforage
			.iterate((score, _key, i) => {
				if (i < 11) myTimer.addScoreToList(score)
			})
			.then(() => console.log('Added all local scores to list'))
	}

	//! Limit score writes to firebase to prevent excessive usage
	async uploadScoresToFirebase(uid) {
		// verify UID
		if (!uid || typeof uid !== 'string')
			console.error('UID missing or invalid')
		const userData = doc(db, 'users', uid)
		const scoresCollection = collection(userData, 'scores')

		const uploadPromises = []
		let scoresInLocalForage = 0
		let scoresUploaded = 0
		let scoreUploadsFailed = 0

		try {
			await localforage.iterate((scoreData, localKey) => {
				scoresInLocalForage++

				if (scoreData === null || typeof scoreData !== 'object') {
					console.warn(
						`Skipping ${localKey} as score data is null or not in valid format`
					)
					scoreUploadsFailed++
				}

				const uploadPromise = addDoc(scoresCollection, scoreData)
					.then(() => {
						console.log(`Added score ${localKey} to Firebase`)
						localforage.removeItem(localKey)
						scoresUploaded++
					})
					.catch((err) => {
						console.error(`Failed to upload ${localKey}`, err)
						scoreUploadsFailed++
					})
				uploadPromises.push(uploadPromise)
			})
			await Promise.all(uploadPromises)

			if (scoresInLocalForage === 0) {
				console.log('No scores found in localforage to upload.')
			} else {
				console.log(`Finished uploading scores for UID: ${uid}.`)
				console.log(
					`Summary: Found ${scoresInLocalForage} scores locally. Successfully uploaded: ${scoresInLocalForage}. Failed/Skipped: ${scoreUploadsFailed}.`
				)
			}
		} catch (e) {
			console.error(
				`An critical error occurred during the score upload process for UID ${uid}:`,
				e
			)
		}
	}
}
