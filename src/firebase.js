import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAanlvj-0Vm07a_BNSY-T4-hYTc7yNjPnc",
    authDomain: "instagram-clone-react-f6357.firebaseapp.com",
    projectId: "instagram-clone-react-f6357",
    storageBucket: "instagram-clone-react-f6357.appspot.com",
    messagingSenderId: "96149342642",
    appId: "1:96149342642:web:925ab601bcd15e8b82fcab",
    measurementId: "G-47EP7KKZQH"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
