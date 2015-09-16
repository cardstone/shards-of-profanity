var mongoose = require(mongoose),
  Schema = mongoose.Schema; 

var cardSchema = new Schema({
  color: String,
  text: String
});

module.exports = mongoose.model('Card', cardSchema);