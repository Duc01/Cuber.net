import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './index'
import { threeByThreeScramble } from './scramble'
import { Timer } from './timer'

// slecting scramble class and rescremable button
const scrambleHTML = document.querySelector('.scramble')
const rescramble = document.querySelector('#rescramble')

let scoresArray = []

function addScoreToList() {
	const scoreObject = scoresArray.at(-1)
	const timesList = document.querySelector('#times')
	const newScore = document.createElement('div')
	newScore.innerHTML = `<h3>${scoreObject.time}</h3> <p>${scoreObject.datetime}</p>`
	newScore.classList.add('score')
	timesList.prepend(newScore)
}

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
	if (e.code === "Space") {
		const score = myTimer.stop(scramble, newScramble)
		scoresArray.push(score)
		addScoreToList()
	}
})
