var mongoose = require('mongoose'),
Schema = mongoose.Schema,
Card = require('../app/models/Card'); //get Card model

//Connect to db
var connect = mongoose.connect(require('../config/db'));
var db = mongoose.connection;

function getWhiteCards(){

	white = [];

	Card.find({'color':'white'}).stream().on('data', function( data ){
		white.push( data );
	});

	return white;
}

function getBlackCards(){

	black = [];

	Card.find({'color':'black'}).stream().on('data', function( data ){
		black.push( data );
	});

	return black;
}

function getWhiteCards( pack ){

	white = [];
	var q;

	if ( pack ){

		q = {
			"color": "white",
			"pack": pack
		};
	}
	else{

		q = {
			"color": "white"
		};
	}

	Card.find( q ).stream().on('data', function( data ){
		white.push( data );
	});

	return white;
}

function getBlackCards( pack ){

	black = [];
	var q;

	if ( pack ){

		q = {
			"color": "black",
			"pack": pack
		};
	}
	else{

		q = {
			"color": "black"
		};
	}

	Card.find( q ).stream().on('data', function( data ){
		black.push( data );
	});

	return black;
}
