import { collection, setDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./index"

onAuthStateChanged(auth, (user) => {
	if (user) {
		setDoc(doc(db, 'users', user.uid), { merge: true })
	}
})
