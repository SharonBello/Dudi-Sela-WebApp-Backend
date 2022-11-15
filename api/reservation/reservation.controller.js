import { getCollectionDocs, addDocument, db } from '../../services/db.service.js'
import { v4 as uuidv4 } from 'uuid'


export async function getReservations(req, res) {
  const result = await getCollectionDocs(db, 'reservations', req.query.docId);
  res.send(result);}

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
    if (result) {
      // An error happened.
      res.end(JSON.stringify({ "result": 1 }))
    }
    res.end(JSON.stringify({ "result": 0 }))
  })
}



