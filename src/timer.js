import { doc, collection, addDoc } from 'firebase/firestore'
import { db, auth } from './index'

export class Timer {

	timerStarted = null
	interval = null
	startTime = null
	timeout = null
	score = null

	constructor(outputElem) {
		this.outputElem = outputElem
	}

	displayOutput() {
		this.outputElem.textContent = this.formatMS(Date.now() - this.startTime)
	}

	formatMS(ms) {
		return new Date(ms).toISOString().substring(14, 22)
	}

	start() {
		if (this.timerStarted) return
		this.startTime = Date.now()
		this.displayOutput()
		this.timerStarted = true
		this.interval = window.setInterval(() => this.displayOutput(), 10)
	}

	createScoreData(currentScramble) {
		const currentDate = new Date()
		const score = {
			time: this.formatMS(Date.now() - this.startTime),
			scramble: currentScramble,
			datetime: currentDate.getDate() + "/"
				+ (currentDate.getMonth() + 1) + "/"
				+ currentDate.getFullYear() + " @ "
				+ currentDate.getHours() + ":"
				+ currentDate.getMinutes() + ":"
				+ currentDate.getSeconds()
		}
		return score
	}

	/**
	 * 
	 * @param {*} score The current score object
	 * @param {*} scoresArray The array where scores are stores
	 */
	addScoreToList(score, scoresArray) {
		scoresArray.push(score)
		const scoreObject = scoresArray.at(-1)
		const timesList = document.querySelector('#times')
		const newScore = document.createElement('div')
		newScore.innerHTML = `<h3>${scoreObject.time}</h3> <p>${scoreObject.datetime}</p>`
		newScore.classList.add('score')
		timesList.prepend(newScore)
	}

	stop(currentScramble, scrambleFunc, scoresArray) {
		if (!this.timerStarted) return

		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const scoresCollection = collection(userDoc, 'scores')
		const currentScore = this.createScoreData(currentScramble)
		addDoc(scoresCollection, currentScore)
		this.addScoreToList(currentScore, scoresArray)
		scrambleFunc()

		// insuring timer cannot be started when releasing spacebar
		this.timeout = window.setTimeout(() => {
			this.timerStarted = false
		}, 500)
		window.clearInterval(this.interval)
		this.interval = null // this stops the timer from continuing to run
		this.displayOutput()
	}
}