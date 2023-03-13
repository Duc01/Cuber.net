import { threeByThreeScramble } from './scramble'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './index'
import { Timer } from './timer'

// slecting scramble class and rescremable button
const scrambleHTML = document.querySelector('.scramble')
const rescramble = document.querySelector('#rescramble')

scrambleHTML.innerText = threeByThreeScramble() // generating scramble on page load
// generating new scramble on button click
rescramble.addEventListener('click', () => {
	scrambleHTML.innerText = threeByThreeScramble()
})

// TODO: remove before public release
onAuthStateChanged(auth, (user) => {
	if (user) console.log(user)
	else console.log('No user signed in!')
})

// selecting timer elements
const timerElem = document.querySelector('#timer')
const playArea = document.querySelector('#play-area')

const myTimer = new Timer(timerElem) // creating a new timer instance

playArea.addEventListener('keyup', (e) => {
	if (e.code === "Space") myTimer.start()
})

playArea.addEventListener('keydown', (e) => {
	if (e.code === "Space") myTimer.stop()
})
