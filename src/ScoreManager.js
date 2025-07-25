import localforage from 'localforage'
import { db, auth } from './index'
import { addDoc, collection, doc } from 'firebase/firestore'

export class ScoreManager {
	constructor() {
		this.scoresArray = []
	}

	/**
	 * Add given score to sidebar list
	 * @param {Object} scoreData 
	 * @param {boolean} isAppend 
	 */
	addScoreToList(scoreData, isAppend = false) {
		// adding new score to the end of scoresArray
		this.scoresArray.push(scoreData)
		const timesList = document.querySelector('#times')
		const newScore = document.createElement('div')
		newScore.innerHTML = `
        <h3 class="content-center p-0 font-bold text-3xl font-spacemono">${scoreData.time}</h3>
        <p class="text-sm">${scoreData.datetime}</p>
        <!-- <p class="text-sm bottom-0 right-0 absolute">expand</p> -->
        <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff" class="absolute bottom-0 right-0 mr-3 mb-3"><path d="M9 9L4 4M4 4V8M4 4H8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9L20 4M20 4V8M20 4H16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 15L4 20M4 20V16M4 20H8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 15L20 20M20 20V16M20 20H16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
		newScore.classList.add(
			'bg-primary',
			'w-[90%]',
			'h-[150px]',
			'p-4',
			'my-4',
			'mx-auto',
			'rounded-lg',
			'drop-shadow-xl'
		)
		if (isAppend) timesList.append(newScore)
		else timesList.prepend(newScore)
	}

	/**
	 * @param {Object} scoreData 
	 */
	async saveScoreFirebase(scoreData) {
		// location to user
		const userData = doc(db, 'users', auth.currentUser.uid)
		// reference to scores collection of specific user
		const scoresCollection = collection(userData, 'scores')
		await addDoc(scoresCollection, scoreData)
		this.addScoreToList(scoreData) // appending new score to display
	}

	/**
	 * @param {Object} scoreData 
	 */
	async saveScoreLocalStorage(scoreData) {
		await localforage.setItem(scoreData.timestamp, scoreData)
		this.addScoreToList(scoreData) // appending new score to display
	}

	addScore(scoreData) {
		if (auth.currentUser) {
			this.saveScoreFirebase(scoreData)
		} else {
			this.saveScoreLocalStorage(scoreData)
		}
	}

	displayLocalScores() {
		localforage
			.iterate((score, _key, i) => {
				if (i <= 12) this.addScoreToList(score)
			})
			.then(() => console.log('Added all local scores to list'))
	}
}