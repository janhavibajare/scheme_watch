// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {getFirestore , collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDccXeXTfHZOn5LPPZ63fjVvAwJnkWUWo",
  authDomain: "schemewatchtest.firebaseapp.com",
  projectId: "schemewatchtest",
  storageBucket: "schemewatchtest.firebasestorage.app",
  messagingSenderId: "169541157876",
  appId: "1:169541157876:web:2642120a28e2e6ee0c2fa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export { addDoc, collection }
export default app;

export { RecaptchaVerifier, signInWithPhoneNumber };

