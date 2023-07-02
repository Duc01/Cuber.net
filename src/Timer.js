export class Timer {
	interval = null
	startTime = null
	timeout = null

	constructor(outputElem) {
		// referencing HTML object to display text
		this.outputElem = outputElem
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

	stop() {
		if (!this.interval) return
		window.clearInterval(this.interval)
		// this.interval = null
		this.displayOutput()
		this.timeout = window.setTimeout(() => {
			this.interval = null
		}, 2000)
	}
}
