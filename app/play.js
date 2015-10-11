var io;
var gameSocket;
var socketsObj;

// var db = require('mongoose');
var model = require('./models/Card');

exports.initPlay = function (sio, socket, socketsInfo) {
	io = sio;
	gameSocket = socket;
	socketsObj = socketsInfo;

	gameSocket.on('client:getRandomCard', sendRandomCard);
};

function sendRandomCard(data) {
	model.count().exec(function (err, count) {
	  	var random = Math.floor(Math.random() * count);
	  	model.findOne({}).skip(random).exec( function (err, card) {
	  		gameSocket.emit('server:card', {card: card});
	  	});
	});
}
