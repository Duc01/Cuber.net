import timestamp from 'unix-timestamp'
import { ScoreManager } from './ScoreManager'

export class Timer {
	interval = null
	startTime = null
	timeout = null
	isTimeoutActive = false

	/**
	 * @param {HTMLElement} outputElem
	 * @param {null | string} currentScramble
	 * @param {Array<any>} scoresArray
	 * @param {String} puzzle
	 */
	constructor(outputElem, currentScramble, scoresArray, puzzle) {
		// referencing HTML object to display text
		this.outputElem = outputElem
		this.currentScramble = currentScramble
		this.scoresArray = scoresArray
		this.puzzle = puzzle
	}

	/**
	 * Update scramble text to a newly generated scramble
	 * @param {string} newScramble
	 */
	updateScramble(newScramble) {
		this.currentScramble = newScramble
	}

	displayOutput() {
		this.outputElem.textContent = this.formatMS(Date.now() - this.startTime)
	}

	/**
	 * format date to MM::SS.XX
	 * @param {Number} ms
	 * @returns {String}
	 */
	formatMS(ms) {
		return new Date(ms).toISOString().substring(14, 22)
	}

	createScoreData() {
		const currentDate = new Date()
		const timeFormat = this.formatMS(Date.now() - this.startTime)
		const a = timeFormat.split(':') // temp variable
		/**
		 * @type {{time: String, 
		 * timeSecs: int, 
		 * scramble: String, 
		 * datetime: String, 
		 * timestamp: number, 
		 * puzzleType: String}}
		 */
		const score = {
			time: timeFormat,
			timeSecs: +a[0] * 60 + +a[1],
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

	/**
	 * Stop timer
	 * @param {Function} newScrambleFunc
	 * @param {ScoreManager} scoreManager
	 */
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
