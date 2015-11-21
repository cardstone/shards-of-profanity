var io;
var gameSocket;
var gamesObj;
var socketsObj;

var model = require('./models/Card');

exports.initHome = function (sio, socket, games, socketsInfo) {
	io = sio;
	gameSocket = socket;
	gamesObj = games;
	socketsObj = socketsInfo;

  // listen for events from clients
	gameSocket.on('client:createNewGame', createNewGame);
	gameSocket.on('client:joinGame', joinGame);
	gameSocket.on('client:joinSuccess', addDefaultName);
	gameSocket.on('client:joinSuccess', sendGames);
	gameSocket.on('client:enterName', enterName);
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
	var gameNum = socketsObj[socketId].room;
	var name = socketsObj[socketId].name;
	var leftMessage = name + ' has left the game. What a quitter.';
	io.sockets.in(gameNum).emit('server:playerDisconnected');
	io.sockets.in(gameNum).emit('server:message', {msg: leftMessage});
}

function createNewGame (data) {
	var thisGameId = Math.floor((Math.random() * 3141592) + 1);
	thisGameId = thisGameId.toString();
	this.join('#' + thisGameId);
	sendGames();
	gamesObj['#' + thisGameId] = new game(
		data.gameName,
		data.maxPlayers,
		data.privateMatch,
		data.maxPoints
	);
  // TODO: put these queries in a function
	model.find({color: 'black'}, 'text numWhites', function (err, cards) {
		gamesObj['#' + thisGameId].blackCards = cards;
		gamesObj['#' + thisGameId].blackCardsOrig = cards;
	});
	model.find({color: 'white'}, 'text', function (err, cards) {
		gamesObj['#' + thisGameId].whiteCards = cards;
		gamesObj['#' + thisGameId].whiteCardsOrig = cards;
	});
	this.emit('server:createSuccess', {gameId: thisGameId});
}

function joinGame (data) {
	var sock = this;
	var gameNum = '#' + data.gameId;
	var room = gameSocket.adapter.rooms[gameNum];
	if (room !== undefined && (gamesObj[gameNum].players.length < gamesObj[gameNum].maxPlayers)) {
		sock.join(gameNum);
		sock.emit('server:joinSuccess');
		socketsObj[this.id] = new socketInfo(gameNum);
		gamesObj[gameNum].players.push(this.id);
	} else {
		sock.emit('server:joinFailure');
	}
}

function leaveGame (data) {
	this.leave(socketsObj[this.id].room);
	emitLeave(this.id);
	socketsObj[this.id].room = null;
}

function addDefaultName (data) {
	socketsObj[this.id].name = data.playerName;
	socketsObj[this.id].avatar = data.avatar;
}

function enterName (data) {
	var newName = data.playerName;
	var oldName = socketsObj[this.id].name;
	var gameNum = socketsObj[this.id].room;
	socketsObj[this.id].name = newName;
	var msg = oldName + ' has been renamed ' + newName;
	io.sockets.in(gameNum).emit('server:message', {msg: msg});
}

function sendGames () {
	var rooms = gameSocket.adapter.rooms;
	var gameRooms = [];
	for(var room in rooms) {
		if(room[0] == '#') {
			if(gamesObj[room] !== undefined) {
				if(Boolean(gamesObj[room].privateMatch) === false) {
					var numPlayers = gamesObj[room].players.length;
					var gameName = gamesObj[room].gameName;
					var maxPlayers = gamesObj[room].maxPlayers;
					var gameNum = room.slice(1);
					var inProgress = gamesObj[room].inProgress;
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
	var gameNum = socketsObj[this.id].room;
	gamesObj[gameNum].inProgress = true;
	sendGames();
}

function disconnect () {
	leaveGame(this.id);
	sendGames();
}

function leaveGame (socketId) {
	if(socketsObj[socketId] === undefined) {
		return;
	}
	else {
		emitLeave(socketId);
		var gameNum = socketsObj[socketId].room;
		var index = gamesObj[gameNum].players.indexOf(socketId);
		if(index === -1) {
			return;
		}
		else {
			gamesObj[gameNum].players.splice(index, 1);
			if(gamesObj[gameNum].players.length === 0) {
				delete gamesObj[gameNum];
			}
			delete socketsObj[this.id];
		}
	}
}

// function manually leaves a socket room
function exitGame () {
	this.leave(socketsObj[this.id].room);
	leaveGame(this.id);
	sendGames();
}
