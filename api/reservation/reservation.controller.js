import { getCollectionDocs, addDocument, deleteDocument, changeDocument, db } from '../../services/db.service.js'
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


export async function isReservationExists(req, res) {
  const result = await getCollectionDocs(db, 'reservations', req.query.docId)
  let foundReservation = false;
  result && result.reservations && result.reservations.forEach(reservation => {
    if (req.body.courtNumber === reservation.courtNumber && req.body.startHour === reservation.startHour) {
      foundReservation = true;
    }
  });
  res.send({isExists: foundReservation})
}

export async function getCredit(req, res) {
  const result = await getCollectionDocs(db, 'user_credit', req.query.docId)
  if (!result || !result.user_credit) {
    res.send({user_credit: 0})
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

export async function getScheduleByWeekDay(req, res) {
  const result = await getCollectionDocs(db, 'schedule_by_weekday', req.query.weekday)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}

export async function postScheduleByWeekDay(req, res) {
  const weekdayReservations = req.body[req.query.weekday]
  addDocument(db, "schedule_by_weekday", req.query.weekday, weekdayReservations, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addReservation(req, res) {
  const _uuid = uuidv4()
  const payload = {
    'id': _uuid,
    'startHour': req.body.startHour,
    'endHour': req.body.endHour,
    'courtNumber': req.body.courtNumber,
    "date": req.body.date,
    'username': req.body.username
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

export async function changeCredit(req, res) {
  const _uuid = uuidv4()
  const payload = {
    'user_credit': req.body.userCredit
  }
  changeDocument(db, "user_credit", req.query.docId, payload, (result) => {
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
    "date": req.body.date,
    'username': req.body.username
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
