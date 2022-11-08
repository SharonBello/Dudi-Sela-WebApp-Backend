import { reservationService } from '../../../../../services/reservation.service.js'
import { logger } from '../../../../../services/logger.service.js'
import { utilService } from '../../../../../services/util.service.js'

// GET LIST
async function getReservations(req, res) {
  try {
    let queryParams = req.query;
    const reservations = await reservationService.query(queryParams)
    res.send(reservations);
  } catch (err) {
    logger.error('Failed to get reservations', err)
    res.status(500).send({ err: 'Failed to get reservations' })
  }
}

// GET BY ID 
async function getReservationById(req, res) {
  
  try {
    const reservationId = req.params.id;
    const reservation = await reservationService.getById(reservationId)
    res.json(reservation)
  } catch (err) {
    logger.error('Failed to get reservation', err)
    res.status(500).send({ err: 'Failed to get reservation' })
  }
}

// POST (add reservation)
async function addReservation(req, res) {
  try {
    const reservation = req.body;
    //add review random
    // if (!reservation.reviewsQty) reservation.reviewsQty = utilService.getRandomInt(50, 1200)
    const addedReservation = await reservationService.add(reservation)
    res.json(addedReservation)
  } catch (err) {
    logger.error('Failed to add reservation', err)
    res.status(500).send({ err: 'Failed to add reservation' })
  }
}

// POST (add review)
// async function addReview(req, res) {
//   console.log('line 47 reservation.controller', req)
//   try {
//     const reservation = req.body;
//     const review = req.body;
//     const addedReview = await reservationService.addUserReview(reservation, review)
//     res.json(addedReview)
//   } catch (err) {
//     logger.error('Failed to add review', err)
//     res.status(500).send({ err: 'Failed to add review' })
//   }
// }

// PUT (Update reservation)
async function editReservation(req, res) {

  try {
    const reservation = req.body;
    if (!reservation.reviewsQty) reservation.reviewsQty = getRandomInt(50, 1200)
    const editReservation = await reservationService.edit(reservation)
    res.json(editReservation)
  } catch (err) {
    logger.error('Failed to edit reservation', err)
    res.status(500).send({ err: 'Failed to edit reservation' })
  }
}

// async function updateReservationRate(req, res) {

//   try {
//     const reservation = req.body;
//     const rating = req.body;
//     const updatedRate = await reservationService.updateUserRating(reservation, rating)
//     res.json(updatedRate)
//   } catch (err) {
//     logger.error('Failed to update reservation', err)
//     res.status(500).send({ err: 'Failed to update reservation' })
//   }
// }

// DELETE (Remove reservation)
async function removeReservation(req, res) {

  try {
    const reservationId = req.params.id;
    await reservationService.remove(reservationId)    
  } catch (err) {
    logger.error('Failed to remove reservation', err)
    res.status(500).send({ err: 'Failed to remove reservation' })
  }
}

module.exports = {
  getReservations,
  getReservationById,
  addReservation,
  editReservation,
  removeReservation,
}
