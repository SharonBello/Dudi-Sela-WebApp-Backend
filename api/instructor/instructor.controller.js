import { getDocuments, db } from '../../services/db.service.js'

export async function getInstructors(req, res) {
  const result = await getDocuments(db, "tau_dudisela", 'tennis_instructors', 'tennis_instructors')
  if (!result) {
    res.send({tennis_instructors: []})
  } else {
    res.send(result)
  }
}