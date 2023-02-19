import { getCollectionDocs, db } from '../../services/db.service.js'

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
