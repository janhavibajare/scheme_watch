// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {getFirestore , collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQn8D-gwt020iTrb93BAbGhKwUoxtZoB8",
  authDomain: "schemewatch-614f8.firebaseapp.com",
  projectId: "schemewatch-614f8",
  storageBucket: "schemewatch-614f8.firebasestorage.app",
  messagingSenderId: "507056081195",
  appId: "1:507056081195:web:e07198933252b1e90e9d6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export { addDoc, collection }
export default app;

export { RecaptchaVerifier, signInWithPhoneNumber };