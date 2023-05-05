import { v4 as uuidv4 } from 'uuid'
import { getDocuments, db, addDocument, deleteDocument, editDocument } from '../../services/db.service.js'

export async function getCourts(req, res) {
  const result = await getDocuments(db, 'courts', 'jawPTlXha948TQyBkuyP')
  if (!result) {
    res.send({courts: []})
  } else {
    res.send(result)
  }
}

export async function getSportCenterMembers(req, res) {
    const result = await getDocuments(db, 'sport_center_members', 'ksaAp1oIHwpb6eH6Z5Ig')
    if (!result || !result.courts) {
      res.send({sport_center_members: []})
    } else {
      res.send(result)
    }
  }

export async function getClubCourts(req, res) {
  const result = await getDocuments(db, 'club_courts', '4rOV0DtYz6cl6doEhKTp')
  if (!result) {
    res.send({club_courts: []})
  } else {
    res.send(result)
  }
}


export async function getPriceConstraints(req, res) {
  const result = await getDocuments(db, 'price_constraints', 'UFZMZOmWYDgreHxh0Epn')
  if (!result) {
    res.send({price_constraints: []})
  } else {
    res.send(result)
  }
}

export async function addClubCourt(req, res) {
  const _uuid = uuidv4()
  const payload = {"name": req.body.name, "type": req.body.type}
  payload['id'] = _uuid
  addDocument(db, "club_courts", '4rOV0DtYz6cl6doEhKTp', payload, (result) => {
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

  addDocument(db, "price_constraints", 'UFZMZOmWYDgreHxh0Epn', payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editPriceConstraint(req, res) {
  editDocument(db, "price_constraints", 'UFZMZOmWYDgreHxh0Epn', req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deletePriceConstraint(req, res) {
  deleteDocument(db, "price_constraints", 'UFZMZOmWYDgreHxh0Epn', req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}