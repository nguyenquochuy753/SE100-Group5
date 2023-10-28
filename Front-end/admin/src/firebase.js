// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFN-ch7jr2_cMklUclXz7pn1Eb-TRKRm0",
  authDomain: "se100-restaurant-app.firebaseapp.com",
  projectId: "se100-restaurant-app",
  storageBucket: "se100-restaurant-app.appspot.com",
  messagingSenderId: "314312609076",
  appId: "1:314312609076:web:3246f34ddb3b81d574e961",
  measurementId: "G-ED6L9BKJVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
