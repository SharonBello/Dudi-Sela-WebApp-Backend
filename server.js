import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { authListener } from './services/auth_state_listener.js'
import path from 'path'
import http from 'http'

const app = express()
let httpServer = http.createServer(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

authListener()
const port = process.env.PORT || 4000

const corsOptions = {
    origin: ['http://127.0.0.1:4000', 'http://127.0.0.1:8080', 'http://localhost:4000', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
    methods: 'GET, POST,PUT,DELETE,OPTIONS'
}
app.use(cors(corsOptions))

import { authRoutes } from './api/auth/auth.routes.js'
import { reservationRoutes } from './api/reservation/reservation.routes.js'
import { courtRoutes } from './api/court/court.routes.js'
import { eventRoutes } from './api/event/event.routes.js'
import { instructorRoutes } from './api/instructor/instructor.routes.js'
import admin from 'firebase-admin'


function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
      admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
            next()
        }).catch(() => {
            res.status(403).send('Unauthorized')
        });
    } else {
        res.status(403).send('Unauthorized')
    }
}

import { serviceAccount } from './.key.service.js'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sela-flutter-auth-default-rtdb.firebaseio.com/"
})

app.use('/', checkAuth)

app.use('/auth', authRoutes)
app.use('/reservations', reservationRoutes)
app.use('/courts', courtRoutes)
app.use('/events', eventRoutes)
app.use('/instructors', instructorRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
