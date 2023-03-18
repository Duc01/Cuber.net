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

	/*
	This code creates the score object in the createScoreData variable, then returns it
	The returned value is returned again in stop function. There might be a better way to do this.
	To future me: Past you didn't know how to do this
	TODO: Fix this mess of return statements
	*/

	stop(currentScramble, scrambleFunc) {
		if (!this.timerStarted) return

		// adding score to database
		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const scoresCollection = collection(userDoc, 'scores')

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
		addDoc(scoresCollection, score)
		scrambleFunc()

		// insuring timer cannot be started when releasing spacebar
		this.timeout = window.setTimeout(() => {
			this.timerStarted = false
		}, 500)
		window.clearInterval(this.interval)
		this.interval = null // this stops the timer from continuing to run
		this.displayOutput()

		return score
	}
	z
	// createScoreData(currentScramble) {
	// 	score = {
	// 		time: this.formatMS(Date.now() - this.startTime),
	// 		scramble: currentScramble
	// 	}
	// }
}