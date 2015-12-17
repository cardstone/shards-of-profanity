var io;
var gameSocket;
var games;
var sockets;

var model = require('./models/Card');

exports.initHome = function (sio, socket, gamesInfo, socketsInfo) {
	io = sio;
	gameSocket = socket;
	games = gamesInfo;
	sockets = socketsInfo;

	// listen for events from clients
	gameSocket.on('client:createNewGame', createNewGame);
	gameSocket.on('client:joinGame', joinGame);
	gameSocket.on('client:joinSuccess', addDefaultName);
	gameSocket.on('client:joinSuccess', sendGames);
	gameSocket.on('client:getGames', sendGames);
	gameSocket.on('client:exitGame', exitGame);
	gameSocket.on('client:startGame', startGame);
	gameSocket.on('disconnect', disconnect);
};

function game (gameName, maxPlayers, privateMatch, maxPoints) {
	this.gameName = gameName;
	this.maxPlayers = maxPlayers;
	this.privateMatch = privateMatch;
	this.maxPoints = maxPoints;
	this.players = [];
	this.czar = -1;
	this.roundNum = 0;
	this.inProgress = false;
	this.blackCards = null;
	this.whiteCards = null;
	this.blackCardsOrig = null;
	this.whiteCardsOrig = null;
}

function socketInfo (room) {
	this.room = room;
	this.name = null;
	this.avatar = null;
	this.points = 0;
}

function emitLeave (socketId) {
	var gameNum = sockets[socketId].room;
	var name = sockets[socketId].name;
	var leftMessage = name + ' has left the game. What a quitter.';
	io.sockets.in(gameNum).emit('server:playerDisconnected');
	io.sockets.in(gameNum).emit('server:message', {msg: leftMessage});
}

function createNewGame (data) {
	var thisGameId = Math.floor((Math.random() * 3141592) + 1);
	thisGameId = thisGameId.toString();
	this.join('#' + thisGameId);
	sendGames();
	games['#' + thisGameId] = new game(
		data.gameName,
		data.maxPlayers,
		data.privateMatch,
		data.maxPoints
	);
	// TODO: put these queries in a function
	model.find({color: 'black'}, 'text numWhites', function (err, cards) {
		games['#' + thisGameId].blackCards = cards;
		games['#' + thisGameId].blackCardsOrig = cards;
	});
	model.find({color: 'white'}, 'text', function (err, cards) {
		games['#' + thisGameId].whiteCards = cards;
		games['#' + thisGameId].whiteCardsOrig = cards;
	});
	this.emit('server:createSuccess', {gameId: thisGameId});
}

function joinGame (data) {
	var sock = this;
	var gameNum = '#' + data.gameId;
	var room = gameSocket.adapter.rooms[gameNum];
	if (room !== undefined && (games[gameNum].players.length < games[gameNum].maxPlayers)) {
		sock.join(gameNum);
		sock.emit('server:joinSuccess');
		sockets[this.id] = new socketInfo(gameNum);
		games[gameNum].players.push(this.id);
	} else {
		sock.emit('server:joinFailure');
	}
}

function leaveGame (data) {
	this.leave(sockets[this.id].room);
	emitLeave(this.id);
	sockets[this.id].room = null;
}

function addDefaultName (data) {
	sockets[this.id].name = data.playerName;
	sockets[this.id].avatar = data.avatar;
}

function enterName (data) {
	var newName = data.playerName;
	var oldName = sockets[this.id].name;
	var gameNum = sockets[this.id].room;
	sockets[this.id].name = newName;
	var msg = oldName + ' has been renamed ' + newName;
	io.sockets.in(gameNum).emit('server:message', {msg: msg});
}

function sendGames () {
	var rooms = gameSocket.adapter.rooms;
	var gameRooms = [];
	for(var room in rooms) {
		if(room[0] == '#') {
			if(games[room] !== undefined) {
				if(Boolean(games[room].privateMatch) === false) {
					var numPlayers = games[room].players.length;
					var gameName = games[room].gameName;
					var maxPlayers = games[room].maxPlayers;
					var gameNum = room.slice(1);
					var inProgress = games[room].inProgress;
					var game = {
						gameNum: gameNum,
						gameName: gameName,
						numPlayers: numPlayers,
						maxPlayers: maxPlayers,
						inProgress: inProgress
					};
					gameRooms.push(game);
				}
			}
		}
	}
	io.sockets.emit('server:games', {games: gameRooms});
}

function startGame () {
	var gameNum = sockets[this.id].room;
	games[gameNum].inProgress = true;
	sendGames();
}

function disconnect () {
	leaveGame(this.id);
	sendGames();
}

// this function is satan
function leaveGame (socketId) {
	if(sockets[socketId] === undefined) {
		return;
	}
	else {
		emitLeave(socketId);
		var gameNum = sockets[socketId].room;
		if(games[gameNum] !== undefined) {
			var index = games[gameNum].players.indexOf(socketId);
			if(index === -1) {
				return;
			}
			else {
				delete sockets[socketId];
				games[gameNum].players.splice(index, 1);
				if(games[gameNum].players.length === 0) {
					delete games[gameNum];
				}
			}
		}
	}
}

// function manually leaves a socket room
function exitGame () {
	if(sockets[this.id] !== undefined) {
		this.leave(sockets[this.id].room);
		leaveGame(this.id);
		sendGames();
	}
}
