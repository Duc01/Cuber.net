import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, doc, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { auth, db } from './index'
import { threeByThreeScramble } from './scramble'
import { Timer } from './timer'

// slecting scramble class and rescremable button
const scrambleHTML = document.querySelector('.scramble')
const rescramble = document.querySelector('#rescramble')

let scoresArray = []

let scramble = threeByThreeScramble() // generating scramble on page load
scrambleHTML.innerText = scramble

function newScramble() {
	scramble = threeByThreeScramble()
	scrambleHTML.innerText = scramble
}

newScramble()

// selecting timer elements
const timerElem = document.querySelector('#timer')
const playArea = document.querySelector('#play-area')

const myTimer = new Timer(timerElem) // creating a new timer instance

// generating new scramble on button click
rescramble.addEventListener('click', () => {
	newScramble()
})

onAuthStateChanged(auth, async (user) => {
	if (user) {
		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const colRef = collection(userDoc, 'scores')
		// const docsSnap = await getDocs(colRef)
		const data = query(colRef, orderBy('datetime', 'desc'), limit(10))
		// const unsubscribe = onSnapshot(data, (recentScores) => {
		// 	recentScores.forEach(doc => {
		// 		myTimer.addScoreToList(doc.data(), scoresArray, true)
		// 	})
		// })
		// unsubscribe()
		const docsSnap = await getDocs(data)
		docsSnap.forEach(doc => {
			myTimer.addScoreToList(doc.data(), scoresArray, true)
		})
	}
	else console.log('No user signed in!')
})

playArea.addEventListener('keyup', (e) => {
	if (e.code === "Space") myTimer.start()
})

playArea.addEventListener('keydown', (e) => {
	if (e.code === "Space") {
		myTimer.stop(scramble, newScramble, scoresArray)
	}
})
