// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {getFirestore , collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcvridNP3yqRy5-cZW838xtu7Txs0M5-c",
  authDomain: "my-web-app-d62d0.firebaseapp.com",
  databaseURL: "https://my-web-app-d62d0-default-rtdb.firebaseio.com",
  projectId: "my-web-app-d62d0",
  storageBucket: "my-web-app-d62d0.firebasestorage.app",
  messagingSenderId: "829682409504",
  appId: "1:829682409504:web:6a7e6cef8d4d6622d3dc45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export { addDoc, collection }
export default app;

export { RecaptchaVerifier, signInWithPhoneNumber };