import localforage from 'localforage'

/**
 * @param {Timer} myTimer - The timer instance to add scores to
 */
export function displayLocalScores(myTimer) {
	// Use localforage to retrieve saved scores
	// The iterate function goes over all values stored in indexDB with
	localforage.iterate((value) => {
		myTimer.addScoreToList(value)
	}, console.log('Iterated over all available local scores'))
}

/**
 * This function can be activated to upload local scores to firebase
 * The functions has some duplicate code form saveScoreToFirebase
 * @param {Auth} auth
 */
export function exportScoresToFirebase(auth) {
	// location of user in db
	const userData = doc(db, 'users', auth.currentUser.uid)
	// refrence to scores for given user
	const scoresCollection = collection(userData, 'scores')
	localforage.iterate((value) => {
		addDoc(scoresCollection, value)
	})
	localforage.clear()
}
