/**
 * command line tool
 * parses text files and outputs each card on a new line
 *
 * USE: node card-parser [file]
 *
 * TODO: write to database
 **/

var through = require('through2'),
	fs = require('fs'),
	split = require('split'),
	readFile = process.argv[2],
	writeFile = 'data/output.txt';

// transform stream
var tr = through(function (buffer, _, next) {
	this.push(buffer.toString() + '\n');
	next();
});

//
var write = fs.createWriteStream(writeFile);

fs.createReadStream(readFile)
	.pipe(split('<>'))
	.pipe(tr)
	.pipe(write);
