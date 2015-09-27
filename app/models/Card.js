/**
 * Model File
 * Creates a model from a custom Schema
 **/

var mongoose = require('mongoose'),
  Schema = mongoose.Schema; 

// Schema for cards
var cardSchema = new Schema({
  color: String,
  text: String,
  pack: String,
});

//Create the model from the Card schema and export it
module.exports = mongoose.model('Card', cardSchema);