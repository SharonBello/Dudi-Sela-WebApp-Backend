import express from 'express'
import { getInstructors, getParticipants } from './instructor.controller.js'

export const instructorRoutes = express.Router()

instructorRoutes.get('/instructors', getInstructors)
instructorRoutes.get('/participants', getParticipants)

