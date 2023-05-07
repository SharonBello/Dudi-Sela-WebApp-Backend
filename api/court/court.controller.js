import { v4 as uuidv4 } from 'uuid'
import { getDocuments, db, addDocument, deleteDocument, editDocument } from '../../services/db.service.js'

export async function getCourts(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'courts', 'courts')
  if (!result) {
    res.send({courts: []})
  } else {
    res.send(result)
  }
}

export async function getSportCenterMembers(req, res) {
    const result = await getDocuments(db, 'tau_dudisela', "sport_center_members", 'sport_center_members')
    if (!result || !result.courts) {
      res.send({sport_center_members: []})
    } else {
      res.send(result)
    }
  }

export async function getClubCourts(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'club_courts', "club_courts")
  if (!result) {
    res.send({club_courts: []})
  } else {
    res.send(result)
  }
}


export async function getPriceConstraints(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'price_constraints', 'price_constraints')
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
  addDocument(db, "tau_dudisela", 'club_courts', 'club_courts', payload, (result) => {
      if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}
export async function addPunchCard(req, res) {
  const _uuid = uuidv4()
  const payload = req.body
  payload['id'] = _uuid
  addDocument(db, "tau_dudisela", 'punch_cards', 'punch_cards', req.body, (result) => {
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

  addDocument(db, "tau_dudisela", "price_constraints", "price_constraints", payload, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function editPriceConstraint(req, res) {
  editDocument(db, "tau_dudisela", "price_constraints", "price_constraints", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}

export async function deletePriceConstraint(req, res) {
  deleteDocument(db, "tau_dudisela", "price_constraints", "price_constraints", req.body, (result) => {
    if (!result) {
      res.end(JSON.stringify({ "result": 0 }))
    }
    else {
      res.end(JSON.stringify({ "result": 1 }))
    }
  })
}


export async function getPunchCards(req, res) {
  const result = await getDocuments(db, 'tau_dudisela', 'punch_cards', 'punch_cards')
  if (!result) {
    res.send({punch_cards: []})
  } else {
    res.send(result)
  }
}