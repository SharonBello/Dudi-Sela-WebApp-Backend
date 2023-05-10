import express from 'express'
import { getReservations, resetScheduleByWeekDay, postScheduleByWeekDay, getScheduleByWeekDay, isReservationExists, addReservation, getCredit, changeCredit, deleteReservation, deleteReservationByDate, addReservationByDate } from './reservation.controller.js'

export const reservationRoutes = express.Router()

reservationRoutes.get('/reservations', getReservations)
reservationRoutes.post('/reservation/exists', isReservationExists)
reservationRoutes.get('/schedule/weekday', getScheduleByWeekDay)
reservationRoutes.post('/schedule/weekday', postScheduleByWeekDay)
reservationRoutes.post('/schedule/reset', resetScheduleByWeekDay)
reservationRoutes.get('/usercredit', getCredit)
reservationRoutes.post('/usercredit', changeCredit)
reservationRoutes.post('/reservations/date', addReservationByDate)
reservationRoutes.delete('/reservations', deleteReservation)
reservationRoutes.delete('/reservations/bydate', deleteReservationByDate)
reservationRoutes.post('/addReservation', addReservation)

