import express from 'express'
import { getCourts, deleteClubHours, getPunchCards, addPunchCard, getClubHours, addClubHours, getClubCourts, getPriceConstraints, addClubCourt, getSportCenterMembers, addPriceConstraint, editPriceConstraint, deletePriceConstraint } from './court.controller.js'

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
courtRoutes.get('/clubhours', getClubHours)
courtRoutes.post('/clubhours/addClubHours', addClubHours)
courtRoutes.delete('/clubhours', deleteClubHours)

