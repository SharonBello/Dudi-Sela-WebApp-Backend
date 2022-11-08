const courtService = require('./court.service.js');
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')

// GET LIST
async function getCourts(req, res) {
  try {
    let queryParams = req.query;
    const courts = await courtService.query(queryParams)
    res.send(courts);
  } catch (err) {
    logger.error('Failed to get courts', err)
    res.status(500).send({ err: 'Failed to get courts' })
  }
}

// GET BY ID 
async function getCourtById(req, res) {
  
  try {
    const courtId = req.params.id;
    const court = await courtService.getById(courtId)
    res.json(court)
  } catch (err) {
    logger.error('Failed to get court', err)
    res.status(500).send({ err: 'Failed to get court' })
  }
}

// POST (add court)
async function addCourt(req, res) {
  try {
    const court = req.body;
    //add review random
    // if (!court.reviewsQty) court.reviewsQty = utilService.getRandomInt(50, 1200)
    const addedCourt = await courtService.add(court)
    res.json(addedCourt)
  } catch (err) {
    logger.error('Failed to add court', err)
    res.status(500).send({ err: 'Failed to add court' })
  }
}

// POST (add review)
// async function addReview(req, res) {
//   console.log('line 47 court.controller', req)
//   try {
//     const court = req.body;
//     const review = req.body;
//     const addedReview = await courtService.addUserReview(court, review)
//     res.json(addedReview)
//   } catch (err) {
//     logger.error('Failed to add review', err)
//     res.status(500).send({ err: 'Failed to add review' })
//   }
// }

// PUT (Update court)
async function editCourt(req, res) {

  try {
    const court = req.body;
    if (!court.reviewsQty) court.reviewsQty = getRandomInt(50, 1200)
    const editCourt = await courtService.edit(court)
    res.json(editCourt)
  } catch (err) {
    logger.error('Failed to edit court', err)
    res.status(500).send({ err: 'Failed to edit court' })
  }
}

// async function updateCourtRate(req, res) {

//   try {
//     const court = req.body;
//     const rating = req.body;
//     const updatedRate = await courtService.updateUserRating(court, rating)
//     res.json(updatedRate)
//   } catch (err) {
//     logger.error('Failed to update court', err)
//     res.status(500).send({ err: 'Failed to update court' })
//   }
// }

// DELETE (Remove court)
async function removeCourt(req, res) {

  try {
    const courtId = req.params.id;
    await courtService.remove(courtId)    
  } catch (err) {
    logger.error('Failed to remove court', err)
    res.status(500).send({ err: 'Failed to remove court' })
  }
}

module.exports = {
  getCourts,
  getCourtById,
  addCourt,
  editCourt,
  removeCourt,
}
