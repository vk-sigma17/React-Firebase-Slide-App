
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCox-K0lg_aYO8BxsNe-dDmSDaeqW9tHK0",
  authDomain: "react-slide-app.firebaseapp.com",
  projectId: "react-slide-app",
  storageBucket: "react-slide-app.appspot.com",
  messagingSenderId: "479256447273",
  appId: "1:479256447273:web:1acc7a0377e48de66d0f38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const SlideCollection = collection(db, "notes")
