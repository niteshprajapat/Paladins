// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "paladins-81138.firebaseapp.com",
    projectId: "paladins-81138",
    storageBucket: "paladins-81138.appspot.com",
    messagingSenderId: "53369460717",
    appId: "1:53369460717:web:0da429b55984ea5dff39e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);