var io;
var gameSocket;
var games;
var sockets;

var roundTimePromise = null;

exports.initPlay = function (sio, socket, gamesInfo, socketsInfo) {
	io = sio;
	gameSocket = socket;
	games = gamesInfo;
	sockets = socketsInfo;

	gameSocket.on('client:getRandWhite', sendRandWhite);
	gameSocket.on('client:whiteSelected', displayWhiteAll);
	gameSocket.on('client:displayWinner', displayWinner);
	gameSocket.on('client:startRound', start);
};

function getRoom (socketId) {
	if (sockets[socketId] === undefined) {
		return -1;
	}
	else {
		return sockets[socketId].room;
	}
}

function sendBlackAll (gameNum) {
	var blackCards = games[gameNum].blackCards;
	var random = Math.floor(Math.random() * blackCards.length);
	io.sockets.in(gameNum).emit('server:displayBlack', {card: blackCards[random]});
	blackCards.splice(random, 1);
}

function sendRandWhite (data) {
	var gameNum = getRoom(this.id);
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
	var gameNum = getRoom(this.id); 
	io.sockets.in(gameNum).emit('server:displayWhite', {id: socketId, cards: data.cards});
}

function displayWinner (data) {
	var socketId = this.id;
	var gameNum = getRoom(this.id); 
	io.sockets.in(gameNum).emit('server:displayWinner', {index: data.index});
}

function start () {
	var gameNum = getRoom(this.id);
	startRound(gameNum);
}

function startRound (gameNum) {
	if(games[gameNum] === undefined) {
		return;
	}
	clearTimeout(roundTimePromise);
	newRound(gameNum);
	incrementCzar(gameNum);
	sendBlackAll(gameNum);
	draw(gameNum);
	enableSubmit(gameNum);
	roundTimePromise = setTimeout(function() {
		startRound(gameNum);
	}, 1000 * 120);
}

function incrementCzar (gameNum) {
	var game = games[gameNum];
	var players = games[gameNum].players;
	if(game.czar != -1) {
		undeclareCzar(players[game.czar]);
	}
	game.czar++;
	if(game.czar >= players.length) {
		game.czar = 0;
	}
	io.to(players[game.czar]).emit('server:czar');
}

function newRound (gameNum) {
	if (games[gameNum] !== undefined) {
		var roundNum = ++games[gameNum].roundNum;
		io.sockets.in(gameNum).emit('server:newRound', {roundNum: roundNum});
	}
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

