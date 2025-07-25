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

	start() {
		if (this.interval) return
		this.startTime = Date.now()
		this.displayOutput()
		this.interval = window.setInterval(() => this.displayOutput(), 10)
	}

	stop(newScrambleFunc, scoreManager) {
		// returning false for use in home.js
		if (!this.interval || this.isTimeoutActive) return
		// stopping timer and displaying final time
		window.clearInterval(this.interval)
		this.displayOutput()
		// saving score
		const scoreData = this.createScoreData()
		if (scoreData) {
			scoreManager.addScore(scoreData)
		}
		// making sure timer cannot be started again within second
		// this is to avoid timer starting on releasing space
		newScrambleFunc()
		this.isTimeoutActive = true
		this.timeout = window.setTimeout(() => {
			this.interval = null
			this.isTimeoutActive = false
		}, 2000)
	}
}