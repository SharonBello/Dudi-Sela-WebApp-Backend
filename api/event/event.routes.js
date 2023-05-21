import express from 'express'
import { getClubEvents, addClubEvent, editClubEvent } from './event.controller.js'

export const eventRoutes = express.Router()

eventRoutes.get('/clubevents', getClubEvents)
eventRoutes.post('/addClubEvent', addClubEvent)
eventRoutes.post('/editClubEvent', editClubEvent)
