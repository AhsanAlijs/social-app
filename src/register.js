import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db, storage } from './config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'
const email = document.querySelector('#email');
const names = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');
const img = document.querySelector('#image');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            const file = img.files[0]
            const storageRef = ref(storage, names.value);
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    addDoc(collection(db, "users"), {
                        name: names.value,
                        email: email.value,
                        uid: user.uid,
                        profileUrl: url
                    }).then((res) => {
                        console.log(res);
                        window.location = 'login.html'
                    }).catch((err) => {
                        console.log(err);
                    })
                })
            });

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });


})