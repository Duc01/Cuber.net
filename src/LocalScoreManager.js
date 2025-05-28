import localforage from 'localforage'
import { Timer } from './Timer'

export class LocalScoreManager {
	/** @param {Timer} myTimer */
	constructor(myTimer) {
		this.myTimer = myTimer
	}

	displayLocalScores() {
		localforage
			.iterate((score, value, i) => {
				if (i < 11) this.myTimer.addScoreToList(score)
			})
			.then(() => console.log('Added all local scores to list'))
	}
}
