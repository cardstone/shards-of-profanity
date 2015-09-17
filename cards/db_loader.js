/* global __dirname */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  fs = require('fs'),
  Lazy = require('lazy'),
  db = mongoose.connect(require('../config/db'));

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
db.connection.collections['cards'].drop();

//Load db
function load_db(file, col) {
  new Lazy(fs.createReadStream(file))
     .lines
     .forEach(function(line){

         var newCard = new Card(
           {
             color: col,
             text: line
           }
         );

         Card.create(newCard);
     }
 );
}
