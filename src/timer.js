import { doc, collection, addDoc } from 'firebase/firestore'
import { db, auth } from './index'

export class Timer {

	timerStarted = null
	interval = null
	startTime = null
	timeout = null

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

	stop(scramble) {
		// TODO create new scramble when timer is stopped
		if (!this.timerStarted) return
		// adding score to database
		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const scoresCollection = collection(userDoc, 'scores')
		addDoc(scoresCollection, {
			time: this.formatMS(Date.now() - this.startTime),
			scramble: scramble
		})
		// insuring timer cannot be started when releasing spacebar
		this.timeout = window.setTimeout(() => {
			this.timerStarted = false
		}, 500)
		window.clearInterval(this.interval)
		this.interval = null
		this.displayOutput()
	}
}