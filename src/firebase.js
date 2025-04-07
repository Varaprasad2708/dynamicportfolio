import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGxvVW_9uURYwdav19xZ6rxT1T7bc8T1I",
    authDomain: "dynamport.firebaseapp.com",
    projectId: "dynamport",
    storageBucket: "dynamport.firebasestorage.app",
    messagingSenderId: "888425663754",
    appId: "1:888425663754:web:88126d2798f5d968fb7ef3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
