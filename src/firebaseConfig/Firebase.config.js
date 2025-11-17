// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt80vqNzF3fVsm8V8WsManuAzUVfOtKNw",
  authDomain: "neo-bill.firebaseapp.com",
  projectId: "neo-bill",
  storageBucket: "neo-bill.firebasestorage.app",
  messagingSenderId: "850153571599",
  appId: "1:850153571599:web:32c563500a3830ab12aa7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app