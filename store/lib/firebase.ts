// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALr--8u0ZA_1H-mID9quqCq5M0YoNklU8",
  authDomain: "next-ecommerce-cc0c9.firebaseapp.com",
  projectId: "next-ecommerce-cc0c9",
  storageBucket: "next-ecommerce-cc0c9.appspot.com",
  messagingSenderId: "926121756677",
  appId: "1:926121756677:web:eb33b5a0a9ea794a70f46c",
  measurementId: "G-216QLS5MT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);