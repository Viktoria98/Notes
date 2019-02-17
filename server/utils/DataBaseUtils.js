import mongoose from 'mongoose';

import '../models/Note';
import config from '../../etc/config.json';

const Note = mongoose.model('Note');

export function setUpConnection() {
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes(id) {
	return Note.find();
}

export function createNote(data) {
	const note = new Note({
		title: data.title,
		text: data.text,
		color: data.color,
		createdAt: new Date()
	});
	return note.save();
}

export function deleteNote(id) {
	console.log(id);
	return Note.findById(id).deleteOne();
}