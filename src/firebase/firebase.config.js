import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNxzZDKXSyv7r8I99CtXu--qVepVNkypw",
    authDomain: "contest-haven.firebaseapp.com",
    projectId: "contest-haven",
    storageBucket: "contest-haven.firebasestorage.app",
    messagingSenderId: "362606153570",
    appId: "1:362606153570:web:19412d860cd9045270263b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
