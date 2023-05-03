import { v4 as uuidv4 } from 'uuid'
import { addClubCourtDoc, getCollectionDocs, db, addPriceConstraintDoc } from '../../services/db.service.js'

export async function getCourts(req, res) {
  const result = await getCollectionDocs(db, 'courts', 'jawPTlXha948TQyBkuyP')
  if (!result) {
    res.send({courts: []})
  } else {
    res.send(result)
  }
}

export async function getSportCenterMembers(req, res) {
    const result = await getCollectionDocs(db, 'sport_center_members', 'ksaAp1oIHwpb6eH6Z5Ig')
    if (!result || !result.courts) {
      res.send({sport_center_members: []})
    } else {
      res.send(result)
    }
  }

export async function getClubCourts(req, res) {
  const result = await getCollectionDocs(db, 'club_courts', '4rOV0DtYz6cl6doEhKTp')
  if (!result) {
    res.send({club_courts: []})
  } else {
    res.send(result)
  }
}


export async function getPriceConstraints(req, res) {
  const result = await getCollectionDocs(db, 'price_constraints', 'UFZMZOmWYDgreHxh0Epn')
  if (!result) {
    res.send({price_constraints: []})
  } else {
    res.send(result)
  }
}

export async function addClubCourt(req, res) {
  addClubCourtDoc(db, "club_courts", '4rOV0DtYz6cl6doEhKTp', {"name": req.body.name, "type": req.body.type}, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function addPriceConstraint(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid

  addPriceConstraintDoc(db, "price_constraints", 'UFZMZOmWYDgreHxh0Epn', payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deleteConstraint(req, res) {
  const data = req.body;
  deleteDocument(db, "price_constraints", req.query.docId, data, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}