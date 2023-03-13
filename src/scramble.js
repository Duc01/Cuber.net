import { Scrambow } from 'scrambow'

export function threeByThreeScramble() {
	let threeXthree = new Scrambow()
	let scrambleObject = threeXthree.get(1)[0]
	let scramble = Object.values(scrambleObject)[0]
	return scramble
}