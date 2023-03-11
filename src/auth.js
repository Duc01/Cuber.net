import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from './index'

// google sign in popup
const googleSignIn = async (user) => {
	try {
		const provider = new GoogleAuthProvider()
		const result = await signInWithPopup(auth, provider)
	} catch (e) {
		console.log(e.code, e.message)
	}
}

const signInBtn = document.querySelector('.sign-in')
const signOutBtn = document.querySelector('.sign-out')

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log(user)
		signInBtn.setAttribute('hidden', true)
		signOutBtn.removeAttribute('hidden')
	} else {
		signInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})
signOutBtn.addEventListener('click', () => {
	signOut(auth)
})
document.querySelector('#google-sign-in').addEventListener('click', googleSignIn)