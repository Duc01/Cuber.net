import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDocs, query, limit, orderBy } from 'firebase/firestore'
import { auth, db } from './index'
import { Cube } from './Cube'
import { Timer } from './Timer'

// slecting scramble class and rescremable button
const scrambleHTML = document.querySelector('.scramble')
const rescramble = document.querySelector('#rescramble')
const cubeInstance = new Cube()

let scoresArray = []

let scramble = cubeInstance.threeByThreeScramble() // generating scramble on page load
scrambleHTML.innerText = scramble

let scrambleVisual = cubeInstance.scrambleDisplay(scramble)
const scrambleDisplayBox = document.querySelector('#scramble-display')
scrambleDisplayBox.appendChild(scrambleVisual)

function newScramble() {
	scramble = cubeInstance.threeByThreeScramble()
	scrambleHTML.innerText = scramble
	scrambleVisual = cubeInstance.scrambleDisplay(scramble)
	scrambleDisplayBox.innerHTML = ''
	scrambleDisplayBox.appendChild(scrambleVisual)
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
		const data = query(colRef, orderBy('datetime', 'desc'), limit(10))
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
