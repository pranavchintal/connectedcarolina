// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const base = {
  REACT_APP_API_KEY: "AIzaSyCqdt-guQXRjLz1CtNimj9sDxXpuZq3KBo",
  REACT_APP_AUTH_DOMAIN: "connectedcarolina.firebaseapp.com",
  REACT_APP_PROJECT_ID: "connectedcarolina",
  REACT_APP_STORAGE_BUCKET: "connectedcarolina.appspot.com",
  REACT_APP_MESSAGING_SENDER_ID: "276698382248",
  REACT_APP_APP_ID: "1:276698382248:web:fc61845501018fa1c6a79d",
  REACT_APP_MEASUREMENT_ID: "G-3YJN7B27ZZ"
}

const firebaseConfig = {
  apiKey: base.REACT_APP_API_KEY,
  authDomain: base.REACT_APP_AUTH_DOMAIN,
  projectId: base.REACT_APP_PROJECT_ID,
  storageBucket: base.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: base.REACT_APP_MESSAGING_SENDER_ID,
  appId: base.REACT_APP_APP_ID,
  measurementId: base.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;