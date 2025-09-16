// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoZlcJUNg8jNrXMU6AG4C1R51AMQkQekQ",
    authDomain: "axamise.firebaseapp.com",
    projectId: "axamise",
    storageBucket: "axamise.firebasestorage.app",
    messagingSenderId: "696863671461",
    appId: "1:696863671461:web:96220f8c1d417387a0b94c",
    measurementId: "G-E3J62TMZMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Firestore Database
export const db = getFirestore(app);



// Firebase Storage
export const storage = getStorage(app);




// authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

