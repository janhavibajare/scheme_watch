// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {getFirestore , collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3kbEk67D444LOBbnXIRNI2OoUcagtpkE",
  authDomain: "schemewatch.firebaseapp.com",
  projectId: "schemewatch",
  storageBucket: "schemewatch.firebasestorage.app",
  messagingSenderId: "851834646772",
  appId: "1:851834646772:web:3c4a41f61055832766aea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export { addDoc, collection }
export default app;

export { RecaptchaVerifier, signInWithPhoneNumber };