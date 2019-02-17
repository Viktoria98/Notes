"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var NoteSchema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

_mongoose.default.model('Note', NoteSchema);