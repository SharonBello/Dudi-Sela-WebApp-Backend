import express from 'express'
import { getCourts, getPunchCards, addPunchCard, getClubCourts, getPriceConstraints, addClubCourt, getSportCenterMembers, addPriceConstraint, editPriceConstraint, deletePriceConstraint } from './court.controller.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.get('/clubcourts', getClubCourts)
courtRoutes.get('/priceconstraints', getPriceConstraints)
courtRoutes.post('/sportCenterMembers', getSportCenterMembers)
courtRoutes.post('/clubcourts/addClubCourt', addClubCourt)
courtRoutes.post('/clubcourts/addPriceConstraint', addPriceConstraint)
courtRoutes.post('/clubcourts/editPriceConstraint', editPriceConstraint)
courtRoutes.delete('/clubcourts', deletePriceConstraint)
courtRoutes.get('/punchcards', getPunchCards)
courtRoutes.post('/punchcards/addPunchCard', addPunchCard)

