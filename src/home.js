import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, doc } from 'firebase/firestore'
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

// generating new scramble on button click
rescramble.addEventListener('click', () => {
	newScramble()
})

// onAuthStateChanged(auth, async (user) => {
// 	if (user) {
// 		const userDoc = doc(db, 'users', auth.currentUser.uid)
// 		const colRef = collection(userDoc, 'scores')
// 		const docsSnap = await getDocs(colRef)
// 		docsSnap.forEach(doc => myTimer.addScoreToList(doc.data(), scoresArray))
// 	}
// 	else console.log('No user signed in!')
// })

// selecting timer elements
const timerElem = document.querySelector('#timer')
const playArea = document.querySelector('#play-area')

const myTimer = new Timer(timerElem) // creating a new timer instance

playArea.addEventListener('keyup', (e) => {
	if (e.code === "Space") myTimer.start()
})

playArea.addEventListener('keydown', (e) => {
	if (e.code === "Space") {
		myTimer.stop(scramble, newScramble, scoresArray)
	}
})
