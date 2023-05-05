import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import  getFirebaseConfig from '../.key.service.js'
import { initializeApp } from 'firebase/app'
const firebaseConfig = getFirebaseConfig()
const initializedFirebase = initializeApp(firebaseConfig)
export const db = getFirestore(initializedFirebase)


export async function getDocuments(db, docName, docId) {
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

export async function resetCollection(db, docName, docId, fn) {
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
// TODO: not only addCocument, but also getDocument, getDocuments, deleteDocument, and editDocument should be generic
export async function addDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)

        let _val, docs = {}
        switch (docName) {
            case "reservations":
            case "reservations_by_date":
            case "schedule_by_weekday":
                _val = docSnap.data() ? docSnap.data().reservations : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["reservations"] = _val
                break;
            case "events":
                _val = docSnap.data() ? docSnap.data().events : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["events"] = _val
                break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().price_constraints : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["price_constraints"] = _val
                break;
            case "club_courts":
                _val = docSnap.data() ? docSnap.data().club_courts : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                docs["club_courts"] = _val
                break;
            default:
                break;
        }
        if (Object.keys(docs).length >0) {
            setDoc(docRef, docs).then((result) => {
                fn(result)
            }).catch((error) => {
                const errorCode = error.code
                fn(errorCode)
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export async function editDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _val, docs={}
        switch (docName) {
            case "user_credit":
                _val = docSnap.data() ? docSnap.data().user_credit : 0
                _val += data.user_credit
                docs["user_credit"] = _val
                break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().price_constraints : 0
                const index = _val.findIndex(constraint => constraint.id === data.id )
                _val[index] = data
                docs["price_constraints"] = _val
                break;
            default:
                break;
        }
        setDoc(docRef, docs).then((result) => {
            fn(result)
        }).catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        fn(error)
    }

}

export async function deleteDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _val, docs={}
        let index
        switch (docName) {
            case "reservations":
                _val = docSnap.data() ? docSnap.data().reservations : []
                index = _val.findIndex(reservation => reservation.id === data.id )
                _val.splice(index, 1)
                docs["reservations"] = _val
                break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().price_constraints : []
                index = _val.findIndex(constraint => constraint.id === data.id )
                _val.splice(index, 1)
                    docs["price_constraints"] = _val
                break;
            default:
                break;
        }
        setDoc(docRef, docs).then((result) => {
            fn(result)
        }).catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }
}
