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
	gameSocket.on('client:blackCard', sendBlackAll);
	gameSocket.on('client:whiteSelected', displayWhiteAll);
	gameSocket.on('client:startRound', startRound);
};

function sendBlackAll (data) {
	var gameNum = socketsObj[this.id].room; 
	var blackCards = gamesObj[gameNum].blackCards;
	var random = Math.floor(Math.random() * blackCards.length);
	io.sockets.in(gameNum).emit('server:displayBlack', {card: blackCards[random]});
	blackCards.splice(random, 1);
}

function sendRandWhite (data) {
	var gameNum = socketsObj[this.id].room;
	var whiteCards = gamesObj[gameNum].whiteCards;
	var cards = [];
	for(var i = 0; i < data.numCards; i++) {
		var random = Math.floor(Math.random() * whiteCards.length);
		cards.push(whiteCards[random]);
		whiteCards.splice(random, 1);
	}
	this.emit('server:whiteCard', {cards: cards});
}

function displayWhiteAll (data) {
	var gameNum = socketsObj[this.id].room; 
	io.sockets.in(gameNum).emit('server:displayWhite', {card: data.card});
}

function startRound () {
	console.log('starting round');
	var gameNum = socketsObj[this.id].room; 
	var game = gamesObj[gameNum];
	var players = gamesObj[gameNum].players;
	if(game.czar != -1) {
		console.log('unzar');
		undeclareCzar(players[game.czar]);
	}
	game.czar++;
	if(game.czar == players.length) {
		game.czar = 0;
	}
	console.log(gamesObj[gameNum].czar);
	declareCzar(players[game.czar]);
}

function declareCzar (socketId) {
	io.to(socketId).emit('server:czar');
}

function undeclareCzar (socketId) {
	io.to(socketId).emit('server:unCzar');
}

