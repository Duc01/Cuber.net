import { Timer } from './Timer'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './index'

const timerElem = document.querySelector('#timer') // timer display
const playArea = document.querySelector('#play-area') // central area

// sign in and sign out buttons
const signInBtn = document.querySelector('.sign-in')
const signOutBtn = document.querySelector('.sign-out')

const myTimer = new Timer(timerElem)

// timer start
playArea.addEventListener('keyup', (e) => {
	if (e.code === 'Space') myTimer.start()
})

// timer stop
playArea.addEventListener('keydown', (e) => {
	if (e.code === 'Space') myTimer.stop()
})

onAuthStateChanged(auth, (user) => {
	if (user) {
		signInBtn.setAttribute('hidden', true)
		signOutBtn.removeAttribute('hidden')
	} else if (!user) {
		signInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})
signOutBtn.addEventListener('click', () => signOut(auth))