/**
 * command line tool
 * parses text files and stores each line as a card in the database
 *
 * USE: node load_cards.js [file] [color] [pack]
 *
 * EXAMPLE: node load_cards.js output.txt white vanilla
 *
 **/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Card = require('../app/models/Card'), //get Card model
	fs = require('fs'),
	file = process.argv[2],
	col = process.argv[3],
	pck = process.argv[4],
	Lazy = require('lazy');

if( file === undefined || col === undefined || pck === undefined )
	throw new Error( "Incorrect arguments!" );

//Connect to db
var connect = mongoose.connect(require('../config/db'));
var db = mongoose.connection;

//Feedback
db.on('error', function ( err ) {
	console.log('                     ');
	console.log('Connection error', err);
	console.log('                     ');
});
db.once('open', function () {
	console.log('                     ');
	console.log('Connected.');
	console.log('                     ');
});

var txt;

//Loads db
(function () {
	new Lazy(fs.createReadStream( file ))
		.lines
		.forEach( function ( line ) {

		if( line ) {
			if(col === 'black') {
				var numW = line.slice(-1);
				txt = line.slice(0, -2);
			}
			else {
				numW =  '0';
				txt = line;
				// TODO: this is ugly, fix?
			}
			var newCard = new Card({
				color: col,
				text: txt,
				numWhites: numW,
				pack: pck

			});

			var q = {
				'text': txt
			};

			//Find one and manage
			Card.findOne( q, function( err, unit ){

				if( err ) throw err;

				if( unit ){

					unit['color'] = col;
					unit['text'] = txt;
					unit['numWhites'] = numW;
					unit['pack'] = pck;
				}else{

					newCard.save(function ( err, data ) {
						if ( err ) console.log( err );
						else console.log('[SAVED] ', data.text);
					});
				}
			});
		}
	});
})();
