import express from 'express'
import { getEvents, addNewEvent } from './event.controller.js'

export const eventRoutes = express.Router()

eventRoutes.get('/events', getEvents)
eventRoutes.post('/addNewEvent', addNewEvent)

