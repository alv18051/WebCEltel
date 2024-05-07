import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxbGItIJUBtB0nwLT5JkbVtajAqXk5bzo",
  authDomain: "inventarioceltel-cef71.firebaseapp.com",
  projectId: "inventarioceltel-cef71",
  storageBucket: "inventarioceltel-cef71.appspot.com",
  messagingSenderId: "297129588575",
  appId: "1:297129588575:web:a9c01bdca02ea07298a8ea",
  measurementId: "G-6BCVFGKHM9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };