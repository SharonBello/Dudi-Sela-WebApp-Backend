import express from 'express'
import { getInstructors } from './instructor.controller.js'

export const instructorRoutes = express.Router()

instructorRoutes.get('/instructors', getInstructors)

