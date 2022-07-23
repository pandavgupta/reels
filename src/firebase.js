// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/analytics'
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSxre_LAiWLaEMDYbynNqLHPkPkadbNOk",
  authDomain: "myselfproject-355501.firebaseapp.com",
  projectId: "myselfproject-355501",
  storageBucket: "myselfproject-355501.appspot.com",
  messagingSenderId: "115318184098",
  appId: "1:115318184098:web:43253fe47becb498a8dffb",
  measurementId: "G-HEBP2ZT27Y"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
const firestore = firebase.firestore(app);
export const database = {
  users : firestore.collection('users'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
const  storage = getStorage(app);
export {storage}
// const analytics = getAnalytics(app);