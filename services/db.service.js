// const MongoClient = require('mongodb').MongoClient
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { keyConfig } from './key.service.js'

import { initializeApp } from 'firebase/app';

const firebaseConfig = keyConfig
const initializedFirebase = initializeApp(firebaseConfig);
const db = getFirestore(initializedFirebase);


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


export { db, getCollectionDocs, addDocument }
