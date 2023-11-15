import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvu0ztE-OvPqJ4yNmnF08f2yMCQ61Qq9o",
    authDomain: "socil-app01.firebaseapp.com",
    projectId: "socil-app01",
    storageBucket: "socil-app01.appspot.com",
    messagingSenderId: "428823642746",
    appId: "1:428823642746:web:a47cb0921796f14de1b1c3",
    measurementId: "G-SE7WCJDTC3"
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);