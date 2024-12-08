// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYmTM4CR6-hX-Kg0BLreFlTJAKhm1J0_E",
  authDomain: "hhhh-83001.firebaseapp.com",
  projectId: "hhhh-83001",
  storageBucket: "hhhh-83001.appspot.com",
  messagingSenderId: "663584402273",
  appId: "1:663584402273:web:bc6622f69cbed02648f320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDB, auth, storage}