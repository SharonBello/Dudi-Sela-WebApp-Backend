import express from 'express'
import { getCourts, getClubCourts, addClubCourt, getSportCenterMembers } from './court.controller.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.get('/clubcourts', getClubCourts)
courtRoutes.post('/sportCenterMembers', getSportCenterMembers)
courtRoutes.post('/clubcourts/addClubCourt', addClubCourt)

