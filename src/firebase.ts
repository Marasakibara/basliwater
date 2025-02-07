import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjWem1M4yMpbcjX20JqU0rvvqfxiGQVS0",
  authDomain: "everlasting-baslik.firebaseapp.com",
  databaseURL:
    "https://everlasting-baslik-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "everlasting-baslik",
  storageBucket: "everlasting-baslik.appspot.com",
  messagingSenderId: "881678948266",
  appId: "1:881678948266:web:97c272fa68b6c1ec80bdd3",
  measurementId: "G-G34PTYWN9E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
