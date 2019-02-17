"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = require("../etc/config.json");

var db = _interopRequireWildcard(require("./utils/DataBaseUtils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialization of express application
var app = (0, _express.default)(); // Set up connection of database

db.setUpConnection(); // Using bodyParser middleware

app.use(_bodyParser.default.json()); // Allow requests from any origin

app.use((0, _cors.default)({
  origin: '*'
})); // RESTful api handlers

app.get('/notes', function (req, res) {
  db.listNotes().then(function (data) {
    return res.send(data);
  });
});
app.post('/notes', function (req, res) {
  db.createNote(req.body).then(function (data) {
    return res.send(data);
  });
});
app.delete('/notes/:id', function (req, res) {
  db.deleteNote(req.params.id).then(function (data) {
    return res.send(data);
  });
});
var server = app.listen(_config.serverPort, function () {
  console.log("Server is up and running on port ".concat(_config.serverPort));
});