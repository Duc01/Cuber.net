import { serverTimestamp } from "firebase/firestore"
export class Timer {
	interval = null
	startTime = null
	timeout = null

	constructor(outputElem, currentScramble) {
		// referencing HTML object to display text
		this.outputElem = outputElem
		this.currentScramble = currentScramble
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

	start() {
		if (this.interval) return
		this.startTime = Date.now()
		this.displayOutput()
		this.interval = window.setInterval(() => this.displayOutput(), 10)
	}

	createScoreData() {
		const currentDate = new Date()
		const score = {
			time: this.formatMS(Date.now() - this.startTime),
			scramble: this.currentScramble,
			datetime: currentDate.getDate() + "/"
				+ (currentDate.getMonth() + 1) + "/"
				+ currentDate.getFullYear() + " @ "
				+ currentDate.getHours() + ":"
				+ currentDate.getMinutes() + ":"
				+ currentDate.getSeconds(),
			timestamp: serverTimestamp()
		}
		if (score.scramble) return score
		else alert('Scramble not updated. Try again')
	}

	stop() {
		// returning false for use in home.js
		if (!this.interval) return false
		window.clearInterval(this.interval)
		// this.interval = null
		this.displayOutput()
		this.timeout = window.setTimeout(() => {
			this.interval = null
		}, 2000)
		return true
	}
}
