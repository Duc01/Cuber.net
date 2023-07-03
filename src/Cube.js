import { Scrambow } from "scrambow"

export class Cube {
	constructor(cubeType) {
		this.cubeType = cubeType
	}

	generateScramble() {
		switch (this.cubeType) {
			case 'ThreeByThree':
				return this.threeByThreeScramble()
		}
	}

	threeByThreeScramble() {
		let threeXthree = new Scrambow()
		let scrambleObject = threeXthree.get(1)[0]
		let scramble = Object.values(scrambleObject)[0]
		return scramble
	}
}