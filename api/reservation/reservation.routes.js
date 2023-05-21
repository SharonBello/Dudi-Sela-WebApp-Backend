import express from 'express'
import { getReservationByDate, deleteEvent, getReservationByDayofweek, getUserReservations, addReservationToUser, isReservationExists, addReservation, getCredit, changeCredit, deleteReservation, addReservationByDate } from './reservation.controller.js'

export const reservationRoutes = express.Router()

// reservationRoutes.get('/reservations', getReservationByDate)
reservationRoutes.post('/reservation/exists', isReservationExists)
// reservationRoutes.get('/schedule/dayofweek', getScheduleByWeekDay)
// reservationRoutes.post('/schedule/dayofweek', postScheduleByWeekDay)
// reservationRoutes.post('/schedule/reset', resetScheduleByWeekDay)
reservationRoutes.get('/usercredit', getCredit)
reservationRoutes.post('/usercredit', changeCredit)
reservationRoutes.post('/reservations/date', addReservationByDate)
reservationRoutes.delete('/reservations', deleteReservation)
reservationRoutes.delete('/reservations/event', deleteEvent)
reservationRoutes.post('/addReservation', addReservation)
reservationRoutes.post('/addReservation/user', addReservationToUser)
// reservationRoutes.post('/userreservations', getUserReservations)
reservationRoutes.post('/userreservations/user', getUserReservations)
reservationRoutes.post('/userreservations/date', getReservationByDate)
reservationRoutes.post('/userreservations/dayofweek', getReservationByDayofweek)
