import express from 'express'
import { getClubEvents, addClubEvent } from './event.controller.js'

export const eventRoutes = express.Router()

eventRoutes.get('/clubevents', getClubEvents)
eventRoutes.post('/addClubEvent', addClubEvent)
