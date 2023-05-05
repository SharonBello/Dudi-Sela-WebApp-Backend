import { getDocuments, db } from '../../services/db.service.js'

export async function getInstructors(req, res) {
  const result = await getDocuments(db, 'tennis_instructors', 'tIOnNnaFBMQMx0mgZXSq')
  if (!result) {
    res.send({instructors: []})
  } else {
    res.send(result)
  }
}