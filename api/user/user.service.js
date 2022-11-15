
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from '../../services/key.service.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(initializeApp(getFirebaseConfig()))

export function signinUser(email, password, fn) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            const user = userCredential.user
            fn(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(error)
            fn(errorCode)
        })
}

export function createUser(email, password, fn) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid
            console.log(uid)
            fn(uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            fn(errorCode)
        })
}