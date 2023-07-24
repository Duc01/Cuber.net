import { auth, db } from './index'
import { setDoc, doc } from 'firebase/firestore'
import {
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth'

const googleSignInBtn = document.querySelector('#google-sign-in')

googleSignInBtn.addEventListener('click', () => {
	const provider = new GoogleAuthProvider()
	signInWithPopup(auth, provider).then(result => {
		const user = result.user
		setDoc(doc(db, 'users', user.uid), { merge: true })
		console.log(user.uid)
		window.location.href = '/'
	})
})