import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { authListener } from './services/auth_state_listener.js'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.static('public'))

authListener()
const port = 4000

import { authRoutes } from './api/auth/auth.routes.js'
import { reservationRoutes } from './api/reservation/reservation.routes.js'
// import { courtRoutes } from './api/courts/court.routes.js'

// app.use('/api/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/reservations', reservationRoutes)


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

