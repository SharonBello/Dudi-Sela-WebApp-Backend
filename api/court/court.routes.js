import express from 'express'
import { getCourts, deleteClubCourt, editClubCourt, deleteClubHours, getUserPermissions, getClubClasses, isAdminUser, getClubUsers, getAboutClub, getClubPreferences, editClubPreferences, editAboutClub, getPunchCards, addClubClass, editPunchCard, addPunchCard, getClubHours, addClubHours, getClubCourts, getPriceConstraints, addClubCourt, getSportCenterMembers, addPriceConstraint, editPriceConstraint, deletePriceConstraint } from './court.controller.js'

export const courtRoutes = express.Router()

courtRoutes.get('/courts', getCourts)
courtRoutes.get('/clubcourts', getClubCourts)
courtRoutes.get('/aboutclub', getAboutClub)
courtRoutes.get('/clubpreferences', getClubPreferences)
courtRoutes.get('/priceconstraints', getPriceConstraints)
courtRoutes.post('/sportCenterMembers', getSportCenterMembers)
courtRoutes.post('/clubcourts/addClubCourt', addClubCourt)
courtRoutes.post('/clubcourts/editClubCourt', editClubCourt)
courtRoutes.post('/clubcourts/addPriceConstraint', addPriceConstraint)
courtRoutes.post('/clubcourts/editPriceConstraint', editPriceConstraint)
courtRoutes.delete('/clubcourts', deletePriceConstraint)
courtRoutes.delete('/clubcourts/court', deleteClubCourt)
courtRoutes.get('/punchcards', getPunchCards)
courtRoutes.get('/clubclasses', getClubClasses)
courtRoutes.get('/clubusers', getClubUsers)
courtRoutes.get('/userpermissions', getUserPermissions)
courtRoutes.post('/punchcards/addPunchCard', addPunchCard)
courtRoutes.post('/punchcards/editPunchCard', editPunchCard)
courtRoutes.post('/clubclasses/addClubClass', addClubClass)
courtRoutes.get('/clubhours', getClubHours)
courtRoutes.post('/clubhours/addClubHours', addClubHours)
courtRoutes.delete('/clubhours', deleteClubHours)
courtRoutes.post('/clubpreferences', editClubPreferences)
courtRoutes.post('/aboutclub', editAboutClub)
courtRoutes.post('/adminusers', isAdminUser)


