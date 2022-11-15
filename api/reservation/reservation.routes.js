import express from 'express'
import { getReservations, addReservation, } from './reservation.controller.js'

export const reservationRoutes = express.Router()

reservationRoutes.get('/reservations', getReservations)
reservationRoutes.post('/reservations', addReservation)

// app.get('/courts', async (req, res) => {
//     await getCollectionDocs(db, 'courts', 'jawPTlXha948TQyBkuyP', (result) => {
//         if (!result.court_numbers) {
//             // An error happened.
//             res.end(JSON.stringify({ "result": 1 }))
//         }
//         res.end(JSON.stringify({ "courts": result }))
//     })
// })

// app.get('/sport_center_members', async (req, res) => {
//     await getCollectionDocs(db, 'sport_center_members', 'ksaAp1oIHwpb6eH6Z5Ig', (result) => {
//         if (!result.members) {
//             // An error happened.
//             res.end(JSON.stringify({ "result": 1 }))
//         }
//         res.end(JSON.stringify({ "sport_center_members": result }))
//     })
// })


