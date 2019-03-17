require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const path = require('path')
const fs = require('fs')
const https = require('https')
const passport = require('passport')
const session = require('express-session')
const socketio = require('socket.io')
const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config')

import {serverPort} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

const app = express();

const certOptions = {
  
}

const server = https.createServer(certOptions, app);

db.setUpConnection();

app.use(express.json());
app.use(passport.initialize());
passportInit();

app.use(cors({origin: '*' }) );

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
}));

const io = socketio(server);

app.set('io', io);

app.use('/', authRouter);

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

server.listen(serverPort, function() {
	console.log(`Server is up and running on port ${serverPort}`);
});