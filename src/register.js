import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from './config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const email = document.querySelector('#email');
const names = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            addDoc(collection(db, "users"), {
                email: email.value,
                username: names.value,
                uid: user.uid
            }).then((res) => {
                console.log(res);
                window.location='./login.html'
            }).catch((err) => {
                console.log(err);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})
