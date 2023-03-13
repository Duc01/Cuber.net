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

	stop() {
		if (!this.timerStarted) return
		this.timeout = window.setTimeout(() => {
			this.timerStarted = false
		}, 500)
		window.clearInterval(this.interval)
		this.interval = null
		this.displayOutput()
	}
}