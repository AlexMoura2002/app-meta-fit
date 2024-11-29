import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAQFnJMWL4rNpFWTnJyT7I_upawhB9qG0E",
    authDomain: "app-meta-fit.firebaseapp.com",
    databaseURL: "https://app-meta-fit-default-rtdb.firebaseio.com",
    projectId: "app-meta-fit",
    storageBucket: "app-meta-fit.firebasestorage.app",
    messagingSenderId: "210115318084",
    appId: "1:210115318084:web:98d2e0c3e97b0d60824711",
    measurementId: "G-0ZYZS7FVT8"
  };

const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getDatabase(app);

export { auth, db};


