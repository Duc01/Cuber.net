import { Timer } from './Timer'
import { ScoreManager } from './ScoreManager'
import { LocalScoreManager } from './LocalScoreManager'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query
} from 'firebase/firestore'
import { auth, db } from './index'
import { Cube } from './Cube'
import { Stats } from './Stats'

const timerElem = document.querySelector('#timer') // timer display
const playArea = document.querySelector('#play-area') // central area

// sign in and sign out buttons
const signInBtn = document.querySelector('.sign-in')
const signOutBtn = document.querySelector('.sign-out')

const scrambleText = document.querySelector('.scramble') // scramble display element
const reScrambleBtn = document.querySelector('#rescramble')
const scrambleDisplayBox = document.querySelector('#scramble-display')

// displaying log in or log out buttons
onAuthStateChanged(auth, async (user) => {
	if (user) {
		// setting visibility of sign in and out btn
		signInBtn.setAttribute('hidden', true)
		signOutBtn.removeAttribute('hidden')
		// loading existing scores
		const userDoc = doc(db, 'users', auth.currentUser.uid)
		const colRef = collection(userDoc, 'scores')
		const data = query(colRef, orderBy('timestamp', 'desc'), limit(12))
		const docsSnap = await getDocs(data)
		docsSnap.forEach((doc) => {
			scoreManager.addScoreToList(doc.data(), true)
		})
	} else if (!user) {
		signInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})

const stats = new Stats()
const ao5Elem = document.querySelector('#ao5')
const ao12Elem = document.querySelector('#ao12')
// stats.pushAvgToHTML(ao5Elem, ao12Elem)
stats
	.getAvgOfScores(5)
	.then((res) => {
		ao5Elem.textContent = res
	})
	.catch((e) => {
		console.error(e)
	})
stats
	.getAvgOfScores(12)
	.then((res) => {
		ao12Elem.textContent = res
	})
	.catch((e) => {
		console.error(e)
	})

const cubeInstance = new Cube('3X3')
const puzzleChangeDropdown = document.querySelector('#puzzle-changer')

cubeInstance.cubeType = puzzleChangeDropdown.value

// setting scramble to null to be updated later
// if scramble is null when timer is stopped then an alert should be triggered
const scoreManager = new ScoreManager()
const myTimer = new Timer(timerElem, null, scoreManager.scoresArray, puzzleChangeDropdown.value)
const localScores = new LocalScoreManager()

localScores.displayLocalScores(scoreManager)

function newScramble() {
	const generatedScramble = cubeInstance.generateScramble()
	scrambleText.innerHTML = generatedScramble[0]
	// updating the new scramble for the Timer function
	myTimer.updateScramble(generatedScramble[0])

	const scrambleVisual = generatedScramble[1]
	scrambleDisplayBox.innerHTML = ''
	scrambleDisplayBox.appendChild(scrambleVisual)
}

newScramble() // generating new scramble on initial load
puzzleChangeDropdown.addEventListener('input', (_e) => {
	cubeInstance.cubeType = puzzleChangeDropdown.value
	newScramble()
})

playArea.addEventListener('keyup', (e) => {
	if (e.code === 'Space') myTimer.start()
})

playArea.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		// checking if the function returned true
		// making sure new scramble is only generated when timer is stopped
		myTimer.puzzle = puzzleChangeDropdown.value
		myTimer.stop(newScramble, scoreManager)
	}
})

signOutBtn.addEventListener('click', () => {
	signOut(auth)
})

reScrambleBtn.addEventListener('click', newScramble)