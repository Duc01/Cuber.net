import { auth, db } from './index'
import { doc, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LocalScoreManager } from './LocalScoreManager'
import localforage from 'localforage'

const googleSignInBtn = document.querySelector('#google-sign-in')
const modal = document.querySelector('#modal')
const modalAccept = document.querySelector('#modal-accept')
const modalCancel = document.querySelector('#modal-cancel')

const scoreManager = new LocalScoreManager()

function signInWithGoogle() {
	const provider = new GoogleAuthProvider()
	signInWithPopup(auth, provider).then(async (result) => {
		const user = result.user
		// creates new user in database if not already present as a result all logins require one read operation
		await setDoc(doc(db, 'users', user.uid), { merge: true })

		if (await localforage.length()) {
			await scoreManager.uploadScoresToFirebase(user.uid)
		}

		console.log(user.uid)
		window.location.href = '/'
	})
}

googleSignInBtn.addEventListener('click', async () => {
	if (await localforage.length()) {
		modal.classList.remove('hidden')
	} else signInWithGoogle()
})

modalAccept.addEventListener('click', async () => signInWithGoogle())

modalCancel.addEventListener('click', () => {
	modal.classList.add('hidden')
	window.location.href = '/'
})
