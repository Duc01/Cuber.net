import localforage from 'localforage'

/**
 * @param {Timer} myTimer - The timer instance to add scores to
 */
export function loadLocalScores(myTimer) {
	// Use localforage to retrieve saved scores
	// The iterate function goes over all values stored in indexDB with
	localforage.iterate((value) => {
		myTimer.addScoreToList(value)
	}, console.log('Iterated over all available local scores'))
}
