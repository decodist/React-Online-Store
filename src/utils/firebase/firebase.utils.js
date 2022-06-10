import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6_TLcxIVUpMrv1P7TEp3OFiiooBOBQi8",
  authDomain: "crwn-clothing-db-9d71d.firebaseapp.com",
  projectId: "crwn-clothing-db-9d71d",
  storageBucket: "crwn-clothing-db-9d71d.appspot.com",
  messagingSenderId: "736559704998",
  appId: "1:736559704998:web:9ff394b6ad206fe1043d67"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	const userDocReference = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocReference);

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocReference, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userDocReference;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, callback);
}
