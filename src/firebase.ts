import { user } from './stores/users';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { UserCredential } from 'firebase/auth'


//**************  AUTH */

import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

import { goto } from '$app/navigation';
const firebaseConfig = {
	apiKey: 'AIzaSyBnN3JG23cbzSnK7OTvH2NxALEoK4YxsNA',
	authDomain: 'anotaciones-renata.firebaseapp.com',
	projectId: 'anotaciones-renata',
	storageBucket: 'anotaciones-renata.appspot.com',
	messagingSenderId: '583782930372',
	appId: '1:583782930372:web:b05d4ad65eed5bdec83691'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logout = async () => {
	try {
		await signOut(auth);
		user.setUser(null);
		goto('/', { replaceState: true });
	} catch (error) {
		console.error(error);
	}
};

const loginconpopup = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const result: UserCredential = await signInWithPopup(auth, provider);
		// let credential = GoogleAuthProvider.credentialFromResult(result)
		// let token = credential.accessToken
		user.setUser(result.user);
	} catch (error) {
		console.error(error);
	}
};
onAuthStateChanged(auth, (authUser) => {
	user.setUser(authUser);
});

// *****************FIRESTORE
const db = getFirestore(app);

export {
	loginconpopup,
	logout,
  db 
};
