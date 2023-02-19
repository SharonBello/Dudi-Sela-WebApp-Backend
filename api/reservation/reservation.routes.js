import express from 'express'
import { getReservations, getReservationsByDate, addReservation, deleteReservation, deleteReservationByDate, addReservationByDate } from './reservation.controller.js'

export const reservationRoutes = express.Router()

reservationRoutes.get('/reservations', getReservations)
reservationRoutes.get('/reservations/date', getReservationsByDate)
reservationRoutes.post('/reservations', addReservation)
reservationRoutes.post('/reservations/date', addReservationByDate)
reservationRoutes.delete('/reservations', deleteReservation)
reservationRoutes.delete('/reservations/bydate', deleteReservationByDate)

