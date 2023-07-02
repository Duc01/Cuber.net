import { auth, db } from './index'
import { setDoc, doc } from 'firebase/firestore'
import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut
} from 'firebase/auth'

// Google Sign in function. More modular approach than alternatives
const googleSignIn = async (user) => {
	try {
		const provider = new GoogleAuthProvider()
		const result = await signInWithPopup(auth, provider)
		document.location = '/'
	} catch (e) {
		console.log(e.code, e.message)
	}
}

const googleSignInBtn = document.querySelector('#google-sign-in')
const signOutBtn = document.querySelector('.sign-out')

// called when user logs in or out
onAuthStateChanged(auth, (user) => {
	// document.location = '/'
	if (user) {
		// create document for user
		setDoc(doc(db, 'users', user.uid), { merge: true })
		console.log(user.uid)
		signOutBtn.removeAttribute('hidden')
		googleSignInBtn.setAttribute('hidden', true)
	}
	else {
		console.log('No User!')
		googleSignInBtn.removeAttribute('hidden')
		signOutBtn.setAttribute('hidden', true)
	}
})

googleSignInBtn.addEventListener('click', googleSignIn)
signOutBtn.addEventListener('click', () => {
	signOut(auth)
	document.location = '/'
})