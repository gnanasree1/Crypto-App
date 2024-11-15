// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCavVVWwdTjYz44CNPeDFy3yt3FTES2i1E",
  authDomain: "crypto-1b23e.firebaseapp.com",
  projectId: "crypto-1b23e",
  storageBucket: "crypto-1b23e.firebasestorage.app",
  messagingSenderId: "1065809574510",
  appId: "1:1065809574510:web:5f12d47317b0a1c277047f",
  measurementId: "G-Y4ZPXT54ZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
