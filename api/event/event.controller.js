import { v4 as uuidv4 } from 'uuid'
import { addDocument, db, getDocuments } from '../../services/db.service.js'

export async function getEvents(req, res) {
  const result = await getDocuments(db, "tau_dudisela", "events", 'events')
  if (!result) {
    res.send({events: []})
  } else {
    res.send(result)
  }
}


export async function addNewEvent(req, res) {
    const _uuid = uuidv4()
    const payload = req.body
    payload['id'] = _uuid
    addDocument(db, "tau_dudisela", "events", "events", payload, (result) => {
        if (!result) {
        res.end(JSON.stringify({ "result": 0 }))
        }
        else {
        res.end(JSON.stringify({ "result": 1 }))
        }
    })
}
