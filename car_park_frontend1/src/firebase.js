// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfDGBwGZ4zdz3JJQA6w57FHBykPGxC3SY",
  authDomain: "smartpark-f6f59.firebaseapp.com",
  projectId: "smartpark-f6f59",
  storageBucket: "smartpark-f6f59.appspot.com",
  messagingSenderId: "874971606897",
  appId: "1:874971606897:web:8bb970eaaca935813c10d0",
  measurementId: "G-56R6EEDDD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;