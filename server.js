import express from 'express'
import cors from 'cors'
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser'
import { authListener } from './services/auth_state_listener.js';
import getFirebaseConfig from './services/key.service.js';

import { initializeApp } from 'firebase/app';
const auth = getAuth(initializeApp(getFirebaseConfig()));

const app = express();
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(cors())
authListener();
// const port = 4000;
const port = process.env.PORT || 4000;
const initializedFirebase = initializeApp(getFirebaseConfig());
const db = getFirestore(initializedFirebase);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

app.post('/signup', (req, res) => {
    // console.log(req.body.email, req.body.password)
    createUser(req.body.email, req.body.password, (uid) => {
        console.log(uid)
        if (!uid) {
            // An error happened.
            res.end(JSON.stringify({ "result": "1" }))
        }
        res.end(JSON.stringify({ "uid": uid }))
    })
});

app.post('/signin', (req, res) => {
    console.log(req.body)
    signinUser(req.body.email, req.body.password, (user) => {
        if (!user.uid) {
            res.end(JSON.stringify({ "result": 1 }))
        }
        res.end(JSON.stringify({ "uid": user.uid }))
    })
});

app.post('/signout', (req, res) => {
    signOut(auth).then(() => {
        // Sign-out successful.
        res.end(JSON.stringify({ "result": 0 }))
        console.log("Sign-out successful.");
    }).catch((error) => {
        // An error happened.
        res.end(JSON.stringify({ "result": 1 }))
    });
});

function signinUser(email, password, fn) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            const user = userCredential.user;
            fn(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            fn(errorCode)
        });
}

function createUser(email, password, fn) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            console.log(uid)
            fn(uid)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            fn(errorCode)
        });
}

app.post('/reservations', async (req, res) => {
    const _uuid = uuidv4();
    const payload = {
        'id': _uuid,
        'startHour': req.body.startHour,
        'endHour': req.body.endHour,
        'courtNumber': req.body.courtNumber,
        "date": req.body.date
    }
    addDocument(db, "reservations", req.query.docId, payload, (result) => {
        if (result) {
            // An error happened.
            res.end(JSON.stringify({ "result": 1 }))
        }
        res.end(JSON.stringify({ "result": 0 }));
    });
});

app.get('/reservations', async (req, res) => {
    await getCollectionDocs(db, 'reservations', req.query.docId, (result) => {
        if (result && !(result.reservations)) {
            // An error happened.
            res.end(JSON.stringify({ "result": 1 }))
        }
        if (result && result.reservations) {
            res.end(JSON.stringify({ "reservations": result.reservations }));
        } else {
            res.end(JSON.stringify({ "reservations": [] }));
        }
    })
});

app.get('/courts', async (req, res) => {
    await getCollectionDocs(db, 'courts', 'jawPTlXha948TQyBkuyP', (result) => {
        if (!result.court_numbers) {
            // An error happened.
            res.end(JSON.stringify({ "result": 1 }))
        }
        res.end(JSON.stringify({ "courts": result }));
    })
});

app.get('/sport_center_members', async (req, res) => {
    await getCollectionDocs(db, 'sport_center_members', 'ksaAp1oIHwpb6eH6Z5Ig', (result) => {
        if (!result.members) {
            // An error happened.
            res.end(JSON.stringify({ "result": 1 }))
        }
        res.end(JSON.stringify({ "sport_center_members": result }));
    })
});

async function getCollectionDocs(db, docName, docId, fn) {
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    fn(docSnap.data());
}

async function addDocument(db, docName, docId, data, fn) {
    // Add a new document
    const docRef = doc(db, docName, docId)
    const docSnap = await getDoc(docRef);
    const _reservations = docSnap.data().reservations
    _reservations.push(data);
    console.log(_reservations)

    setDoc(docRef, { "reservations": _reservations })
        .then((result) => {
            fn(result)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            fn(errorCode)
        });
}