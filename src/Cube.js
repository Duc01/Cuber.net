import { Scrambow } from 'scrambow'
import { ScrambleDisplay } from 'scramble-display'

export class Cube {
	constructor(cubeType) {
		this.cubeType = cubeType
	}

	generateScramble() {
		switch (this.cubeType) {
			case 'ThreeByThree':
				const scramble = this.threeByThreeScramble()
				const scrambleVisual = this.threeByThreeDisplay(scramble)
				return [scramble, scrambleVisual]
		}
	}

	/** @return {string} */
	threeByThreeScramble() {
		let threeXthree = new Scrambow()
		let scrambleObject = threeXthree.get(1)[0]
		let scramble = Object.values(scrambleObject)[0]
		return scramble
	}

	/** @param {string} currentScramble
	 * @return {ScrambleDisplay} */
	threeByThreeDisplay(currentScramble) {
		const el = new ScrambleDisplay()
		el.event = '333'
		el.scramble = currentScramble
		return el
	}
}
