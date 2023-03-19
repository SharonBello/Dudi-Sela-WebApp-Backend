import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import  getFirebaseConfig from '../.key.service.js'
import { initializeApp } from 'firebase/app'
const firebaseConfig = getFirebaseConfig()
const initializedFirebase = initializeApp(firebaseConfig)
export const db = getFirestore(initializedFirebase)


export async function getCollectionDocs(db, docName, docId) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
        console.log(docName + " no such document fo " + docId)
    }
    return docSnap.data()
}

const isArray = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export async function resetDocument(db, docName, docId, fn) {
    try {
        const docRef = doc(db, docName, docId)
        await setDoc(docRef, { "reservations": [] })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }
}

export async function addDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _reservations = docSnap.data() ? docSnap.data().reservations : []
        if (!_reservations) {
            _reservations = []
        }
        if (isArray(data)) {
            _reservations.push(...data)
        } else {
            _reservations.push(data)
        }
        setDoc(docRef, { "reservations": _reservations })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }

}

export async function changeDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _user_credit = docSnap.data() ? docSnap.data().user_credit : 0
        _user_credit += data.user_credit
            setDoc(docRef, { "user_credit": _user_credit })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }

}

export async function deleteDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        const _reservations = docSnap.data() ? docSnap.data().reservations : []
        const index = _reservations.findIndex(reservation => reservation.id === data.id )
        _reservations.splice(index, 1)
            setDoc(docRef, { "reservations": _reservations })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }
}
