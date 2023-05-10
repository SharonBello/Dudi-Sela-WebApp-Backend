import { getDocuments, resetCollection, addDocument, deleteDocument, editDocument, db } from '../../services/db.service.js'
import { v4 as uuidv4 } from 'uuid'
// TODO: implement reservations scheulde by date and weekday from within tau_dudisella
export async function getReservations(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "reservations" ,'reservations', req.query.docId)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}


export async function isReservationExists(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "reservations", 'reservations', req.query.docId)
  let foundReservation = false;
  result && result.reservations && result.reservations.forEach(reservation => {
    if (req.body.date === reservation.date && req.body.courtNumber === reservation.courtNumber && req.body.startHour === reservation.startHour && req.body.username === reservation.username) {
      foundReservation = true;
    }
  });
  res.send({isExists: foundReservation})
}

export async function getCredit(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'user_credit', req.query.docId)
  if (!result || !result.user_credit) {
    res.send({user_credit: 0})
  }
  else {
    res.send(result)
  }
}
// export async function getReservationsByDate(req, res) {
//   const result = await getDocuments(db, "tau_dudisela", 'reservations_by_date', req.query.date)
//   if (!result || !result.reservations) {
//     res.send({reservations: []})
//   }
//   else {
//     res.send(result)
//   }
// }


export async function getScheduleByWeekDay(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'schedule_by_weekday', req.query.weekday)
  if (!result || !result.reservations) {
    res.send({reservations: []})
  }
  else {
    res.send(result)
  }
}

export async function resetScheduleByWeekDay(req, res) {
  await resetCollection(db, "tau_dudisela", "schedule_by_weekday", req.query.weekday, (result) => {
    if (result) {
      res.end(JSON.stringify({ "result": 1 }))
    } else {
      res.end(JSON.stringify({ "result": 0 }))
    }
  })
}

export async function postScheduleByWeekDay(req, res) {
  const weekdayReservations = req.body
  for (let index = 0; index < weekdayReservations.length; index++) {
    const reservation = weekdayReservations[index];
    //
    await addDocument(db, "tau_dudisela", "schedule_by_weekday", "schedule_by_weekday", req.query.weekday, reservation, (result) => {
      if (result) {
        res.end(JSON.stringify({ "result": 1 }))
      }
    })
  }
  res.end(JSON.stringify({ "result": 0 }))
}

export async function addReservation(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid

  addDocument(db, "tau_dudisela", "court_reservations" ,"court_reservations", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function changeCredit(req, res) {
  const payload = {
    'user_credit': req.body.userCredit
  }
  editDocument(db, "tau_dudisela", "user_credit", "user_credit", req.query.docId, payload, (result) => {
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
  deleteDocument(db, "tau_dudisela", "reservations", "reservations", req.query.docId, data, (result) => {
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
  addDocument(db, "tau_dudisela", "reservations_by_date", "reservations_by_date", req.query.date, payload, (result) => {
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
  deleteDocument(db, "tau_dudisela", "reservations_by_date", "reservations_by_date", req.query.date, data, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}
