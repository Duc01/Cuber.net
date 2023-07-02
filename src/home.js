import { Timer } from './Timer'

const timerElem = document.querySelector('#timer') // timer display
const playArea = document.querySelector('#play-area') // central area

const myTimer = new Timer(timerElem)

// timer start
playArea.addEventListener('keyup', (e) => {
	if (e.code === 'Space') myTimer.start()
})

// timer stop
playArea.addEventListener('keydown', (e) => {
	if (e.code === 'Space') myTimer.stop()
})
