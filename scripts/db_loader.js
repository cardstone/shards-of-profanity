/**
 * command line tool
 * parses text files and stores each line as a card in the database
 *
 * USE: node db_loader [file] [color] [pack]
 *
 **/

/* global __dirname */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  fs = require('fs'),
  readFile = process.argv[2],
  color = process.argv[3],
  pack = process.argv[4],
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
  text: String,
  pack: String
});

var Card = mongoose.model('Card', cardSchema);

// Call load
load_db(readFile, color, pack);

//Loads db
function load_db(file, col, pck) {
  new Lazy(fs.createReadStream(file))
    .lines
    .forEach(function (line) {

      var newCard = new Card({
        color: col,
        text: line,
        pack: pck
      });

      var q = {
        'text': line
      };

      Card.find(q, function (err, doc) {
        if (doc === 0) {
          newCard.save(function (err, data) {
            if (err) console.log(err);
            else console.log('[SAVED] ', data.text);
          });
        }
      });
    });
}
