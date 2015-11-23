var io;
var gameSocket;
var games;
var socketsObj;

exports.initPlay = function (sio, socket, gamesInfo, socketsInfo) {
	io = sio;
	gameSocket = socket;
	games = gamesInfo;
	socketsObj = socketsInfo;

	gameSocket.on('client:getRandWhite', sendRandWhite);
	gameSocket.on('client:whiteSelected', displayWhiteAll);
	gameSocket.on('client:displayWinner', displayWinner);
	gameSocket.on('client:startRound', startRound);
};

 
function sendBlackAll (gameNum) {
	var blackCards = games[gameNum].blackCards;
	var random = Math.floor(Math.random() * blackCards.length);
	io.sockets.in(gameNum).emit('server:displayBlack', {card: blackCards[random]});
	blackCards.splice(random, 1);
}

function sendRandWhite (data) {
	var gameNum = socketsObj[this.id].room;
	var whiteCards = games[gameNum].whiteCards;
	var cards = [];
	for(var i = 0; i < data.numCards; i++) {
		var random = Math.floor(Math.random() * whiteCards.length);
		cards.push(whiteCards[random]);
		whiteCards.splice(random, 1);
	}
	this.emit('server:whiteCard', {cards: cards});
}

function displayWhiteAll (data) {
	var socketId = this.id;
	var gameNum = socketsObj[this.id].room; 
	io.sockets.in(gameNum).emit('server:displayWhite', {id: socketId, cards: data.cards});
}

function displayWinner (data) {
	var socketId = this.id;
	var gameNum = socketsObj[this.id].room; 
	io.sockets.in(gameNum).emit('server:displayWinner', {index: data.index});
}

function startRound () {
	var gameNum = socketsObj[this.id].room; 
	newRound(gameNum);
	incrementCzar(gameNum);
	sendBlackAll(gameNum);
	draw(gameNum);
	enableSubmit(gameNum);
}

function incrementCzar (gameNum) {
	var game = games[gameNum];
	var players = games[gameNum].players;
	if(game.czar != -1) {
		undeclareCzar(players[game.czar]);
	}
	game.czar++;
	if(game.czar == players.length) {
		game.czar = 0;
	}
	io.to(players[game.czar]).emit('server:czar');
}

function newRound (gameNum) {
	io.sockets.in(gameNum).emit('server:newRound');
}

function draw (gameNum) {
	io.sockets.in(gameNum).emit('server:draw');
}

function enableSubmit (gameNum) {
	io.sockets.in(gameNum).emit('server:enableSubmit');
}

function declareCzar (socketId) {
	io.to(socketId).emit('server:czar');
}

function undeclareCzar (socketId) {
	io.to(socketId).emit('server:unCzar');
}

