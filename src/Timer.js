import { serverTimestamp } from "firebase/firestore"
import { db, auth } from './index'
import { addDoc, collection, doc } from "firebase/firestore"

export class Timer {
	interval = null
	startTime = null
	timeout = null

	constructor(outputElem, currentScramble, scoresArray) {
		// referencing HTML object to display text
		this.outputElem = outputElem
		this.currentScramble = currentScramble
		this.scoresArray = scoresArray
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

	addScoreToList(scoreData, isAppend = false) {
		// adding new score to the end of scoresArray
		this.scoresArray.push(scoreData)
		const timesList = document.querySelector('#times')
		const newScore = document.createElement('div')
		newScore.innerHTML = `
		<h3 class="content-center p-0 font-bold text-2xl">${scoreData.time}</h3>
		<p class="text-sm">${scoreData.datetime}</p>`
		newScore.classList.add('bg-[#6e5235]', 'w-[90%]', 'h-[150px]', 'p-4', 'my-4', 'mx-auto', 'rounded-[5px]', 'drop-shadow-xl')
		if (isAppend) timesList.append(newScore)
		else timesList.prepend(newScore)
	}

	saveScore() {
		const scoreData = this.createScoreData()
		// location to user
		const userData = doc(db, 'users', auth.currentUser.uid)
		// reference to scores collection of specific user
		const scoresCollection = collection(userData, 'scores')
		addDoc(scoresCollection, scoreData)
		this.addScoreToList(scoreData) // appending new score to display
	}

	stop() {
		// returning false for use in home.js
		if (!this.interval) return false
		// stopping timer and displaying final time
		window.clearInterval(this.interval)
		this.displayOutput()
		// saving score
		this.saveScore()
		// making sure timer cannot be started again within second
		// this is to avoid timer starting on releasing space
		this.timeout = window.setTimeout(() => {
			this.interval = null
		}, 2000)
		return true // returns true when timer is stopped
	}
}
