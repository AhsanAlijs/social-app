import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth } from './config.js';

const email = document.querySelector('#email');
const names = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    window.location='./socialapp.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

})