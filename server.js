import express from 'express'
import cors from 'cors'
import path from 'path'

import { getCollectionDocs, addDocument } from './services/db.service.js'

const app = express();
const port = 3000;

app.get('/reservations/:docId', async (req, res) => {
    //'tAjxAZkOBAdhHWHXbM7EmVpbBM72'
    const result = await getCollectionDocs(db, 'reservations', req.params.docId)
    console.log(result)
    res.send(result)
});

app.get('/courts', async (req, res) => {
    const docId = 'jawPTlXha948TQyBkuyP';
    const result = await getCollectionDocs(db, 'courts', docId)
    console.log(result)
    res.send(result)
});

app.get('/sport_center_members', async (req, res) => {
    const docId = 'ksaAp1oIHwpb6eH6Z5Ig';
    const result = await getCollectionDocs(db, 'sport_center_members', docId)
    console.log(result)
    res.send(result)
});

app.post('/reservations', async (req, res) => {
    await addDocument(db, "reservations", req.data.docId, req.data.payload);
    res.send({ result: "Success" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


