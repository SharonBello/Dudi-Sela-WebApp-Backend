import express from 'express'
// import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getReservations, getReservationById, addReservation, removeReservation, editReservation} from './reservation.controller.js'
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getReservations)
router.get('/:id', getReservationById)
router.post('/', addReservation)
router.put('/:id', editReservation)
router.delete('/:id',  removeReservation)

module.exports = router