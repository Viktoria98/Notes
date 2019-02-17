"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpConnection = setUpConnection;
exports.listNotes = listNotes;
exports.createNote = createNote;
exports.deleteNote = deleteNote;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../../etc/config.json"));

require("../models/Note");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = _mongoose.default.model('Note');

function setUpConnection() {
  _mongoose.default.connect("mongodb://".concat(_config.default.db.host, ":").concat(_config.default.db.port, "/").concat(_config.default.db.name));
}

function listNotes(id) {
  return Note.find();
}

function createNote(data) {
  var note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });
  return note.save();
}

function deleteNote(id) {
  return Note.findById(id).remove();
}