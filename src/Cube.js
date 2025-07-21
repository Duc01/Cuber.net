import { Scrambow } from 'scrambow'
import { ScrambleDisplay } from 'scramble-display'

export class Cube {
	constructor(cubeType) {
		this.cubeType = cubeType
	}

	generateScramble() {
		switch (this.cubeType) {
			case '3X3':
				const threeByThreeScramble = this.threeByThreeScramble()
				const threeByThreeVisual = this.threeByThreeDisplay(threeByThreeScramble)
				return [threeByThreeScramble, threeByThreeVisual]
			case '2X2':
				const twoByTwoScramble = this.twoByTwoScramble()
				const twoByTwoVisual = this.twoByTwoDisplay(twoByTwoScramble)
				return [twoByTwoScramble, twoByTwoVisual]
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

	/** 
	 * @param {string} currentScramble
	 * @return {ScrambleDisplay} */
	threeByThreeDisplay(currentScramble) {
		const el = new ScrambleDisplay()
		el.event = '333'
		el.scramble = currentScramble
		return el
	}

	twoByTwoScramble() {
		let twoByTwo = new Scrambow().setType('222')
		let scrambleObject = twoByTwo.get(1)[0]
		let scramble = Object.values(scrambleObject)[1]
		return scramble
	}

	twoByTwoDisplay(currentScramble) {
		const el = new ScrambleDisplay()
		el.event = '222'
		el.scramble = currentScramble
		return el
	}

}
