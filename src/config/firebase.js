// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKsfor Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmfPsKeWOfvDZUbU-X6qxyDzYiNsvtxss",
  authDomain: "project-baru-b8329.firebaseapp.com",
  projectId: "project-baru-b8329",
  storageBucket: "project-baru-b8329.appspot.com",
  messagingSenderId: "871281814228",
  appId: "1:871281814228:web:15a05c496549d2ec79e941",
  measurementId: "G-JT9R5E3H65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, analytics, db}

