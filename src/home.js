import { Timer } from './Timer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
	collection,
	doc,
	query,
	getDocs,
	orderBy,
	limit
} from 'firebase/firestore'
import { auth, db } from './index'
import { Cube } from './Cube'
import { loadLocalScores } from './loadLocalScores'

const timerElem = document.querySelector('#timer') // timer display
const playArea = document.querySelector('#play-area') // central area

// sign in and sign out buttons
const signInBtn = document.querySelector('.sign-in')
const signOutBtn = document.querySelector('.sign-out')

const scrambleText = document.querySelector('.scramble') // scramble display element
const cubeInstance = new Cube('ThreeByThree') // cube class instance
const reScrambleBtn = document.querySelector('#rescramble')
const scrambleDisplayBox = document.querySelector('#scramble-display')

let scoresArray = []

// displaying log in or log out buttons
onAuthStateChanged(auth, async (user) => {
	if (user) {
		// setting visibility of sign in and out btn
		signInBtn.setAttribute('hidden', true)
		signOutBtn.removeAttribute('hidden')
		// loading existing scores
		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const colRef = collection(userDoc, 'scores')
		const data = query(colRef, orderBy('datetime', 'desc'), limit(12))
		const docsSnap = await getDocs(data)
		docsSnap.forEach((doc) => {
			myTimer.addScoreToList(doc.data(), true)
		})
	} else if (!user) {
		signInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})

// setting scramble to null to be updated later
// if scramble is null when timer is stopped then an alert should be triggered
const myTimer = new Timer(timerElem, null, scoresArray)

loadLocalScores(myTimer)

// creating new scramble
function newScramble() {
	const generatedScramble = cubeInstance.generateScramble()
	scrambleText.innerHTML = generatedScramble[0]
	// updating the new scrambe for the Timer function
	myTimer.updateScramble(generatedScramble[0])

	const scrambleVisual = generatedScramble[1]
	scrambleDisplayBox.innerHTML = ''
	scrambleDisplayBox.appendChild(scrambleVisual)
}
newScramble() // generating new scramble on intial load

// timer start
playArea.addEventListener('keyup', (e) => {
	if (e.code === 'Space') myTimer.start()
})

// timer stop
playArea.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		// checking if the function returned true
		// making sure new scramble is only generated when timer is stopped
		if (myTimer.stop()) newScramble()
	}
})

signOutBtn.addEventListener('click', () => signOut(auth))

reScrambleBtn.addEventListener('click', newScramble)
