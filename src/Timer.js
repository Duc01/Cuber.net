import localforage from 'localforage'
import { db, auth } from './index'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import timestamp from 'unix-timestamp'

export class Timer {
	interval = null
	startTime = null
	timeout = null
	isTimeoutActive = false

	/**
	 * @param {HTMLElement} outputElem
	 * @param {null | string} currentScramble
	 * @param {Array<any>} scoresArray
	 */
	constructor(outputElem, currentScramble, scoresArray, puzzle) {
		// referencing HTML object to display text
		this.outputElem = outputElem
		this.currentScramble = currentScramble
		this.scoresArray = scoresArray
		this.puzzle = puzzle
	}

	updateScramble(newScramble) {
		this.currentScramble = newScramble
	}

	displayOutput() {
		this.outputElem.textContent = this.formatMS(Date.now() - this.startTime)
	}

	// format date to minutes:seconds.subseconds
	formatMS(ms) {
		return new Date(ms).toISOString().substring(14, 22)
	}

	createScoreData() {
		const currentDate = new Date()
		const score = {
			time: this.formatMS(Date.now() - this.startTime),
			scramble: this.currentScramble,
			datetime:
				currentDate.getDate() +
				'/' +
				(currentDate.getMonth() + 1) +
				'/' +
				currentDate.getFullYear() +
				' @ ' +
				currentDate.getHours() +
				':' +
				currentDate.getMinutes() +
				':' +
				currentDate.getSeconds(),
			timestamp: timestamp.now(),
			puzzleType: this.puzzle
		}
		if (score.scramble) return score
		else alert('Scramble not updated. Try again')
	}

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

	saveScoreFirebase() {
		const scoreData = this.createScoreData()
		// location to user
		const userData = doc(db, 'users', auth.currentUser.uid)
		// reference to scores collection of specific user
		const scoresCollection = collection(userData, 'scores')
		addDoc(scoresCollection, scoreData)
		this.addScoreToList(scoreData) // appending new score to display
	}

	saveScoreLocalStorage() {
		const scoreData = this.createScoreData()
		localforage.setItem(scoreData.timestamp, scoreData)
		this.addScoreToList(scoreData) // appending new score to display
	}

	start() {
		if (this.interval) return
		this.startTime = Date.now()
		this.displayOutput()
		this.interval = window.setInterval(() => this.displayOutput(), 10)
	}

	stop() {
		// returning false for use in home.js
		if (!this.interval || this.isTimeoutActive) return
		// stopping timer and displaying final time
		window.clearInterval(this.interval)
		this.displayOutput()
		// saving score
		if (auth.currentUser) this.saveScoreFirebase()
		else if (!auth.currentUser) this.saveScoreLocalStorage()
		// making sure timer cannot be started again within second
		// this is to avoid timer starting on releasing space
		this.isTimeoutActive = true
		this.timeout = window.setTimeout(() => {
			this.interval = null
			this.isTimeoutActive = false

			return true // returns true when timer is stopped
		}, 2000)
	}
}
