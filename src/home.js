import { Timer } from './Timer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './index'
import { Cube } from './Cube'

const timerElem = document.querySelector('#timer') // timer display
const playArea = document.querySelector('#play-area') // central area

// sign in and sign out buttons
const signInBtn = document.querySelector('.sign-in')
const signOutBtn = document.querySelector('.sign-out')

const scrambleText = document.querySelector('.scramble') // scramble display element
const cubeInstance = new Cube('ThreeByThree') // cube class instance
const reScrambleBtn = document.querySelector('#rescramble')

let scoresArray = []

// displaying log in or log out buttons
onAuthStateChanged(auth, (user) => {
	if (user) {
		signInBtn.setAttribute('hidden', true)
		signOutBtn.removeAttribute('hidden')
	} else if (!user) {
		signInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})

// setting scramble to null to be updated later
// if scramble is null when timer is stopped then an alert should be triggered
const myTimer = new Timer(timerElem, null, scoresArray)

// creating new scramble
function newScramble() {
	const generatedScramble = cubeInstance.generateScramble()
	scrambleText.innerHTML = generatedScramble
	// updating the new scrambe for the TImer function
	myTimer.updateScramble(generatedScramble)
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