import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoWb-9GAWUI_jIu6Oj9mNzaBS3x7Mf60Q",
  authDomain: "calender-app-83c46.firebaseapp.com",
  projectId: "calender-app-83c46",
  storageBucket: "calender-app-83c46.firebasestorage.app",
  messagingSenderId: "248389661305",
  appId: "1:248389661305:web:e64d36abcc0f1c4e975aa8",
  measurementId: "G-FSD5LRWTK1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
