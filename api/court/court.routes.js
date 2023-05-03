import express from 'express'
import { getCourts, getClubCourts, getPriceConstraints, addClubCourt, getSportCenterMembers, addPriceConstraint } from './court.controller.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.get('/clubcourts', getClubCourts)
courtRoutes.get('/priceconstraints', getPriceConstraints)
courtRoutes.post('/sportCenterMembers', getSportCenterMembers)
courtRoutes.post('/clubcourts/addClubCourt', addClubCourt)
courtRoutes.post('/clubcourts/addPriceConstraint', addPriceConstraint)

