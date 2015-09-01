/**
 * command line tool
 * parses text files and outputs each card on a new line
 *
 * USE: node card-parser [file]
 *
 * TODO: write to file instead od process.stdout
 * TODO: write to database
 **/

var through = require('through2'),
  fs = require('fs'),
  split = require('split'),
  file = process.argv[2];

// transform function
var tr = through(function(buffer, _, next) {
  this.push(buffer.toString() + '\n');
  next();
});

fs.createReadStream(file)
  .pipe(split('<>'))
  .pipe(tr)
  .pipe(process.stdout);
