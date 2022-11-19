import express from 'express'
import { getCourts, getSportCenterMembers } from './court.controller.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.post('/sportCenterMembers', getSportCenterMembers)

