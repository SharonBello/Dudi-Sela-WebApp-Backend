import express from 'express'
import { getReservations, addReservation, } from './reservation.controller.js'

export const reservationRoutes = express.Router()

reservationRoutes.get('/reservations', getReservations)
reservationRoutes.post('/reservations', addReservation)

