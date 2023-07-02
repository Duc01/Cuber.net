import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCxA7e597f3Y7UoOk8uvjHP4r6o0BxyPF4',
	authDomain: 'pacecuber-a19e5.firebaseapp.com',
	projectId: 'pacecuber-a19e5',
	storageBucket: 'pacecuber-a19e5.appspot.com',
	messagingSenderId: '43862959665',
	appId: '1:43862959665:web:62f605a43e5ccbcc6fd710',
	measurementId: 'G-8GS938H0TF'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { app, auth, db }
