import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import  getFirebaseConfig from './key.service.js'

import { initializeApp } from 'firebase/app'

const firebaseConfig = getFirebaseConfig()
const initializedFirebase = initializeApp(firebaseConfig)
export const db = getFirestore(initializedFirebase)


export async function getCollectionDocs(db, docName, docId) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data())
    } else {
        console.log("No such document!")
    }
    return docSnap.data()
}

export async function addDocument(db, docName, docId, data, fn) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef)
    const _reservations = docSnap.data() ? docSnap.data().reservations : []
    _reservations.push(data)
    setDoc(docRef, { "reservations": _reservations })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            fn(errorCode)
        })
}

export async function deleteDocument(db, docName, docId, data, fn) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef)
    const _reservations = docSnap.data() ? docSnap.data().reservations : []
    const index = _reservations.findIndex(reservation => reservation.id === data.id )
    console.log(_reservations)
    _reservations.splice(index, 1)
    console.log(_reservations)
    setDoc(docRef, { "reservations": _reservations })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            fn(errorCode)
        })
}
