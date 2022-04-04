import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDDTN8cNfd-brS35OyxrAPb46x8d-6BlPM",
    authDomain: "chatapp-94039.firebaseapp.com",
    projectId: "chatapp-94039",
    storageBucket: "chatapp-94039.appspot.com",
    messagingSenderId: "833750777725",
    appId: APPID,
    measurementId: "G-F0YYTFX7HT"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()

const googleProvider = new GoogleAuthProvider()                            

export { db, auth, googleProvider, app }  
