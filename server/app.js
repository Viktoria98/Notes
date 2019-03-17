import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
let server;

import {serverPort} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app)
}
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
  }
  server = https.createServer(certOptions, app)
}

const app = express();

db.setUpConnection();

app.use(bodyParser.json());
app.use(cors({origin: '*' }) );

app.get('/notes', (req, res) => {
	db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
	db.createNote(req.body).then(data => res.send(data));
});

app.put('/notes/:id', (req, res) => {
	console.log(req.body);
	db.updateNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
	console.log(req.params);
	db.deleteNote(req.params.id).then(data => res.send(data));
});

server = app.listen(serverPort, function() {
	console.log(`Server is up and running on port ${serverPort}`);
});