// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {getFirestore , collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpAvqxLzgSiT97KlRwykEzRXLzeTKfA44",
  authDomain: "schemewatch-c34c5.firebaseapp.com",
  projectId: "schemewatch-c34c5",
  storageBucket: "schemewatch-c34c5.firebasestorage.app",
  messagingSenderId: "780390926285",
  appId: "1:780390926285:web:9e719ad46b117464586684",
  measurementId: "G-Y1YM4PPJLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export { addDoc, collection }
export default app;

export { RecaptchaVerifier, signInWithPhoneNumber };

