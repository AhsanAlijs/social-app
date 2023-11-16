import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth, db } from './config.js';
import { collection, addDoc, getDocs, Timestamp, query, orderBy, deleteDoc, doc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const userName = document.querySelector('#names')
const logout = document.querySelector('#logout')
const profileImage = document.querySelector('#image')
const title = document.querySelector('#title');
const description = document.querySelector('#textarea')
const form=document.querySelector('#form')
const card = document.querySelector('#card')


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        // get user data start
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            userName.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
        });

        // get user data end
    } else {
        window.location = './login.html'
    }
});

//   logOut start
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfull');
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})
//   logOut End

// get data from fire store start
let arr = [];

function renderPost() {
    card.innerHTML = ''
    arr.map((item) => {
        card.innerHTML += `
        <div class="card mt-2 w-[70%] bg-[#1a2930] py-2">
        <div class="card-body">
            <p class="text-[#fff]"><span class="h4 px-2">Title:</span>${item.title}</p>
            <p class="text-[#fff]"><span class="h4 px-2">Description:</span>${item.description}</p>
            <div class="mt-[50px] gap-6">
            <button type="button" id="delete" class="btn btn-danger text-[#ffffff]">Delete</button>
            <button type="button" id="update" class="btn btn-info  text-[#ffffff]">Edit</button>
            </div>
        </div>
    </div>`
    })

    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "posts", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderPost()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt('enter new Title');
            await updateDoc(doc(db, "posts", arr[index].docId), {
                title: updatedTitle
            });
            arr[index].title = updatedTitle;
            renderPost()

        })
    })
}

async function getDataFromFirestore() {
    arr.length = 0;
    const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        arr.push({ ...doc.data(), docId: doc.id });
    });
    console.log(arr);
    renderPost();
}
getDataFromFirestore()


//post data on firestore

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const postObj = {
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date())
        }
        const docRef = await addDoc(collection(db, "posts"), postObj);
        console.log("Document written with ID: ", docRef.id);
        postObj.docId = docRef.id;
        arr = [postObj, ...arr];
        console.log(arr);
        renderPost();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})
// get data from fire store end