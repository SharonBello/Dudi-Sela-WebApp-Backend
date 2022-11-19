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
    origin: ['http://127.0.0.1:4000', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    methods: 'GET, POST,PUT,DELETE,OPTIONS'
}
app.use(cors(corsOptions))

import { authRoutes } from './api/auth/auth.routes.js'
import { reservationRoutes } from './api/reservation/reservation.routes.js'
import { courtRoutes } from './api/court/court.routes.js'

app.use('/auth', authRoutes)
app.use('/reservations', reservationRoutes)
app.use('/courts', courtRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
