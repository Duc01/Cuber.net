import { Scrambow } from 'scrambow'
import { ScrambleDisplay } from 'scramble-display'

export class Cube {
	scrambleDisplay(currentScramble) {
		const el = new ScrambleDisplay()
		el.event = '333'
		el.scramble = currentScramble
		return el
	}

	threeByThreeScramble() {
		let threeXthree = new Scrambow()
		let scrambleObject = threeXthree.get(1)[0]
		let scramble = Object.values(scrambleObject)[0]
		return scramble
	}
}