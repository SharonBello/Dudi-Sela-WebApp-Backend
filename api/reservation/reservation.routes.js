import express from 'express'
import { getReservations, getReservationsByDate, addReservation, getCredit, changeCredit, deleteReservation, deleteReservationByDate, addReservationByDate } from './reservation.controller.js'

export const reservationRoutes = express.Router()

reservationRoutes.get('/reservations', getReservations)
reservationRoutes.get('/reservations/date', getReservationsByDate)
reservationRoutes.get('/usercredit', getCredit)
reservationRoutes.post('/reservations', addReservation)
reservationRoutes.post('/usercredit', changeCredit)
reservationRoutes.post('/reservations/date', addReservationByDate)
reservationRoutes.delete('/reservations', deleteReservation)
reservationRoutes.delete('/reservations/bydate', deleteReservationByDate)

