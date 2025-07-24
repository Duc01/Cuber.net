import { Scrambow } from 'scrambow'
import { ScrambleDisplay } from 'scramble-display'

export class Cube {
	constructor(cubeType = undefined) {
		this.cubeType = cubeType
	}

	generateScramble() {
		let scramble = ''
		let displayElem = ''
		switch (this.cubeType) {
			case '3X3':
				scramble = this.threeByThreeScramble()
				displayElem = this.displayFunc(scramble, '333')
				return [scramble, displayElem]
			case '2X2':
				scramble = this.twoByTwoScramble()
				displayElem = this.displayFunc(scramble, '222')
				return [scramble, displayElem]
		}
	}

	/* IMPORTANT: The Scrambow.get(1) method returns an object.
		Within this object the actual Scramble string might be anywhere
		It's on index 0 for 3x3 and index 1 for 2x2 
	*/

	/** @return {string} */
	threeByThreeScramble() {
		let threeXthree = new Scrambow()
		let scrambleObject = threeXthree.get(1)[0]
		let scramble = Object.values(scrambleObject)[0]
		return scramble
	}

	twoByTwoScramble() {
		let twoByTwo = new Scrambow().setType('222')
		let scrambleObject = twoByTwo.get(1)[0]
		let scramble = Object.values(scrambleObject)[1]
		return scramble
	}

	displayFunc(currentScramble, puzzleType) {
		const displayElem = new ScrambleDisplay()
		displayElem.event = puzzleType
		displayElem.scramble = currentScramble
		return displayElem
	}

}
