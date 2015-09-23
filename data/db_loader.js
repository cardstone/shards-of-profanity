/* global __dirname */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  fs = require('fs'),
  Lazy = require('lazy');

mongoose.connect(require('../config/db'));
var db = mongoose.connection;

//Feedback
db.on('error', function (err) {
  console.log('                     ');
  console.log('Connection error', err);
  console.log('                     ');
});
db.once('open', function () {
  console.log('                     ');
  console.log('Connected.');
  console.log('                     ');
});

//Schema
var cardSchema = new Schema({
  color: String,
  text: String
});

var Card = mongoose.model('Card', cardSchema);

//Input
var whiteCards = __dirname + "\\white\\output.txt";
var blackCards = __dirname + "\\black\\output.txt";

load_db(whiteCards, 'white');
load_db(blackCards, 'black');

//Clear DB to avoid duplicates
db.collections['cards'].drop();

//Load db
function load_db(file, col) {
  new Lazy(fs.createReadStream(file))
    .lines
    .forEach(function (line) {

      var newCard = new Card({
        color: col,
        text: line
      });
      newCard.save(function (err, data) {
        if (err) console.log(err);
        else console.log('[SAVED] ', data['text']);
      });
    });
}
