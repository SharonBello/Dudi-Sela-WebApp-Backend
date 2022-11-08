const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getCourts, getCourtById, addCourt, removeCourt, editCourt} = require('./court.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getCourts)
router.get('/:id', getCourtById)
router.post('/', addCourt)
router.put('/:id', editCourt)
router.delete('/:id',  removeCourt)

module.exports = router