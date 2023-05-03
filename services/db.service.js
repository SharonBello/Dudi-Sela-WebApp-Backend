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

// TODO: replace addPriceConstraintDoc with addDocument
export async function addClubCourtDoc(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _courts = docSnap.data() ? docSnap.data().courts : []
        _courts.push(data)
        setDoc(docRef, { "courts": _courts })
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
// TODO: replace addPriceConstraintDoc with addDocument
export async function addPriceConstraintDoc(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _constraints = docSnap.data() ? docSnap.data().constraints : []
        _constraints.push(data)
        setDoc(docRef, { "constraints": _constraints })
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

// export async function addDocument(db, docName, docId, data, fn) {
//     try {
//         const docRef = doc(db, docName, docId)
//         const docSnap = await getDoc(docRef)
//         let _val
//         switch (docName) {
//             case "reservations":
//                 _val = docSnap.data() ? docSnap.data().reservations : []
//                 if (!_val) {
//                     _val = []
//                 }
//                 if (isArray(data)) {
//                     _val.push(...data)
//                 } else {
//                     _val.push(data)
//                 }
//                 break;
//             default:
//                 break;
//         }
//         if (_val) {
//             const obj = {}
//             obj[docName] = _val
//             setDoc(docRef, obj).then((result) => {
//                 fn(result)
//             }).catch((error) => {
//                 const errorCode = error.code
//                 fn(errorCode)
//             })
//         }
//     } catch (error) {
//         console.error(error)
//     }

// }
// TODO: replace addEventDocument with addDocument
export async function addEventDocument(db, docName, docId, data, fn) {
    try {
        const docRef = doc(db, docName, docId)
        const docSnap = await getDoc(docRef)
        let _events = docSnap.data() ? docSnap.data().events : []
        if (!_events) {
            _events = []
        }
        if (isArray(data)) {
            _events.push(...data)
        } else {
            _events.push(data)
        }
        setDoc(docRef, { "events": _events })
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
