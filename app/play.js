var io;
var gameSocket;
var gamesObj;
var socketsObj;

exports.initPlay = function (sio, socket, games, socketsInfo) {
	io = sio;
	gameSocket = socket;
	gamesObj = games;
	socketsObj = socketsInfo;

	gameSocket.on('client:getRandWhite', sendRandWhite);
};

function sendRandWhite(data) {
	var gameNum = socketsObj[this.id].room;
	var whiteCards = gamesObj[gameNum].whiteCards;
	var random = Math.floor(Math.random() * whiteCards.length);
	this.emit('server:whiteCard', {card: whiteCards[random]});	
}
