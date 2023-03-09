const Scrambler = require('scrambow').Scrambow
function generateScramble() {
	let threeXthree = new Scrambler()
	let scrambleObject = threeXthree.get(1)[0]
	let scramble = Object.values(scrambleObject)[0]
	return scramble
}

const scrambleHTML = document.querySelector('.scramble')
const rescramble = document.querySelector('#rescramble')

scrambleHTML.innerText = generateScramble()
rescramble.addEventListener('click', () => {
	scrambleHTML.innerText = generateScramble()
})