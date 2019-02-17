import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {serverPort} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

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

app.delete('/notes/:id', (req, res) => {
	console.log(req.params);
	db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, function() {
	console.log(`Server is up and running on port ${serverPort}`);
});