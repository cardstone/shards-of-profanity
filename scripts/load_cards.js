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
  readFile = process.argv[2],
  color = process.argv[3],
  pack = process.argv[4],
  Lazy = require('lazy');

if( readFile === undefined || color === undefined || pack === undefined )
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

//Loads db
(function ( file, col, pck ) {
  new Lazy(fs.createReadStream( file ))
    .lines
    .forEach( function ( line ) {
	
		if( line ) {
			if(color === 'black') {
				numWhites = line.slice(-1);
				text = line.slice(0, -1);
			}
			else {
				numWhites =  '0';
				text = line;
				// TODO: this is ugly, fix?
			}
			var newCard = new Card({
				color: col,
				text: text,
				numWhites: numWhites,
				pack: pck

			});

			var q = {
				'text': line
			};
			
			//Find one and manage
			Card.findOne( q, function( err, user ){
			
				if( err ) throw err;
				
				if( user ){

					user['color'] = col;
					user['text'] = line;
					user['pack'] = pck;
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
