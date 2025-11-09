// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyB_nUgO6zSithLC0YtaLqZOBogLJr63yXc",
  authDomain: "habit-tracker-b0971.firebaseapp.com",
  projectId: "habit-tracker-b0971",
  storageBucket: "habit-tracker-b0971.firebasestorage.app",
  messagingSenderId: "227370553811",
  appId: "1:227370553811:web:9858baecadf4ffa40d9f26"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
