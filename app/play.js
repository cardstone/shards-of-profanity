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
	gameSocket.on('client:whiteSelected', displayWhiteAll);
	gameSocket.on('client:startRound', startRound);
};


// TODO: separating 'card getting' functionality into different file? (for modularity and shit) 
function sendBlackAll (gameNum) {
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
	var gameNum = socketsObj[this.id].room; 
	newRound(gameNum);
	incrementCzar(gameNum);
	sendBlackAll(gameNum);
	draw(gameNum);
	enableSelect(gameNum);
}

function incrementCzar (gameNum) {
	var game = gamesObj[gameNum];
	var players = gamesObj[gameNum].players;
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

function enableSelect (gameNum) {
	io.sockets.in(gameNum).emit('server:enableSelect');
}

function declareCzar (socketId) {
	io.to(socketId).emit('server:czar');
}

function undeclareCzar (socketId) {
	io.to(socketId).emit('server:unCzar');
}

