import { getCollectionDocs, addDocument, deleteDocument, db } from '../../services/db.service.js'
import { v4 as uuidv4 } from 'uuid'

export async function getReservations(req, res) {
  const result = await getCollectionDocs(db, 'reservations', req.query.docId)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}

export async function getReservationsByDate(req, res) {
  const result = await getCollectionDocs(db, 'reservations_by_date', req.query.date)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}

export async function addReservation(req, res) {
  const _uuid = uuidv4()
  const payload = {
    'id': _uuid,
    'startHour': req.body.startHour,
    'endHour': req.body.endHour,
    'courtNumber': req.body.courtNumber,
    "date": req.body.date
  }
  addDocument(db, "reservations", req.query.docId, payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteReservation(req, res) {
  const data = req.body;
  deleteDocument(db, "reservations", req.query.docId, data, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addReservationByDate(req, res) {
  const _uuid = uuidv4()
  const payload = {
    'id': _uuid,
    'startHour': req.body.startHour,
    'endHour': req.body.endHour,
    'courtNumber': req.body.courtNumber,
    "date": req.body.date
  }
  addDocument(db, "reservations_by_date", req.query.date, payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}


export async function deleteReservationByDate(req, res) {
  const data = req.body;
  deleteDocument(db, "reservations_by_date", req.query.date, data, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}
