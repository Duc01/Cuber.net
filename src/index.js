// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCxA7e597f3Y7UoOk8uvjHP4r6o0BxyPF4",
	authDomain: "pacecuber-a19e5.firebaseapp.com",
	projectId: "pacecuber-a19e5",
	storageBucket: "pacecuber-a19e5.appspot.com",
	messagingSenderId: "43862959665",
	appId: "1:43862959665:web:62f605a43e5ccbcc6fd710",
	measurementId: "G-8GS938H0TF"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log(app)


const auth = getAuth(app) // import auth instance 

// google sign in popup
const googleSignIn = async () => {
	try {
		const provider = new GoogleAuthProvider()
		const result = await signInWithPopup(auth, provider)
		const credential = GoogleAuthProvider.credentialFromResult(result)
		const token = credential.accessToken
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