import express from 'express'
import cors from 'cors'
import path from 'path'

import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }


const firebaseConfig = {
    "apiKey": "AIzaSyCYdlPEQSYi6f2oeIQqygaRXEq8Jn7-6zg",
    "authDomain": "sela-flutter-auth.firebaseapp.com",
    "projectId": "sela-flutter-auth",
    "storageBucket": "sela-flutter-auth.appspot.com",
    "messagingSenderId": "458892736143",
    "appId": "1:458892736143:web:2fbadbd58bc980051c22fa"
}

import { initializeApp } from 'firebase/app';

const app = express();
const port = 3000;
const initializedFirebase = initializeApp(firebaseConfig);
const db = getFirestore(initializedFirebase);

app.get('/reservations/:docId', async (req, res) => {
    //'tAjxAZkOBAdhHWHXbM7EmVpbBM72'
    const result = await getCollectionDocs(db, 'reservations', req.params.docId)
    console.log(result)
    res.send(result)
});

app.get('/courts', async (req, res) => {
    const docId = 'jawPTlXha948TQyBkuyP';
    const result = await getCollectionDocs(db, 'courts', docId)
    console.log(result)
    res.send(result)
});

app.get('/sport_center_members', async (req, res) => {
    const docId = 'ksaAp1oIHwpb6eH6Z5Ig';
    const result = await getCollectionDocs(db, 'sport_center_members', docId)
    console.log(result)
    res.send(result)
});

app.post('/reservations', async (req, res) => {
    await addDocument(db, "reservations", req.data.docId, req.data.payload);
    res.send({result:"Success"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

async function getCollectionDocs(db, docName, docId) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
    return docSnap.data();
}

async function addDocument(db, docName, docId, pyaload) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, docName, docId), payload);
}
