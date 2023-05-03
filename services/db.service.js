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

        let _val
        let obj = {}
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
                obj["reservations"] = _val
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
                obj["events"] = _val
                break;
            case "price_constraints":
                _val = docSnap.data() ? docSnap.data().constraints : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                obj["constraints"] = _val
            case "club_courts":
                _val = docSnap.data() ? docSnap.data().courts : []
                if (!_val) {
                    _val = []
                }
                if (isArray(data)) {
                    _val.push(...data)
                } else {
                    _val.push(data)
                }
                obj["courts"] = _val
            default:
                break;
        }
        if (Object.keys(obj).length >0) {
            setDoc(docRef, obj).then((result) => {
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

export async function changeDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _val
        switch (docName) {
            case "user_credit":
                _val = docSnap.data() ? docSnap.data().user_credit : 0
                _val += data.user_credit
                break;
            default:
                break;
        }
        const obj = {}
        obj[docName] = _val
        setDoc(docRef, obj).then((result) => {
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
        let _val
        switch (docName) {
            case "reservations":
                _val = docSnap.data() ? docSnap.data().reservations : []
                const index = _reservations.findIndex(reservation => reservation.id === data.id )
                _val.splice(index, 1)
                break;
            default:
                break;
        }
        const obj = {}
        obj[docName] = _val
        setDoc(docRef, obj).then((result) => {
            fn(result)
        }).catch((error) => {
            const errorCode = error.code
            fn(errorCode)
        })
    } catch (error) {
        console.error(error)
    }
}
