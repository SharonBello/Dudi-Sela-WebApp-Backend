import { signinUser, createUser } from '../user/user.service.js'
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from '../../.key.service.js'
import { getAuth, signOut } from "firebase/auth"

const auth = getAuth(initializeApp(getFirebaseConfig()))

export function signin(req, res) {
    signinUser(req.body.email, req.body.password, (result) => {
        if (result.message) {
            res.end(JSON.stringify({ "message": result.message }))
        }
        else {
            res.end(JSON.stringify({ "uid": result }))
        }
    })
}

export function signup(req, res) {
    createUser(req.body.email, req.body.password, (result) => {
        if (result.message) {
            res.end(JSON.stringify({ "message": result.message }))
        }
        else {
            res.end(JSON.stringify({ "uid": result }))
        }
    })
}

export function signout(req, res) {
    signOut(auth).then(() => {
        res.end(JSON.stringify({ "result": 0 }))
        console.log("Sign-out successful.")
    }).catch((error) => {
        res.end(JSON.stringify({ "result": 1 }))
    })
}

