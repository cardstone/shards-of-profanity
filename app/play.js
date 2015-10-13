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
	var queryColor = data.color;
	model.find({color: queryColor}).exec(function (err, cards) {
		var random = Math.floor(Math.random() * cards.length);
		gameSocket.emit('server:card', {card: cards[random]});
	});

}
