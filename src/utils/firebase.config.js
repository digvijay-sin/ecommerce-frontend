
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoT5QvE2if6u_GKsBGgD5UeDG3izlQHvg",
  authDomain: "e-commerceapp-1c7e9.firebaseapp.com",
  projectId: "e-commerceapp-1c7e9",
  storageBucket: "e-commerceapp-1c7e9.firebasestorage.app",
  messagingSenderId: "289694783577",
  appId: "1:289694783577:web:92922607462a10132e7948",
  measurementId: "G-JKN9HJPGQ3"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 

