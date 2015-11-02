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
	gameSocket.on('disconnect', disconnect);
};

// game object constructor
function game () {
	this.players = [];
	this.czar = -1;
	this.blackCards = null;
	this.whiteCards = null;
	this.blackCardsOrig = null;
	this.whiteCardsOrig = null;
}

// socketInfo object constructor
function socketInfo (room) {
	this.room = room;
	this.name = null;
	this.avatar = null;
	this.points = 0;
}

// helper function for leaving games
function emitLeave(socketId) {
	var gameNum = socketsObj[socketId].room;
	var name = socketsObj[socketId].name;
	var leftMessage = name + ' has left the game. What a quitter.';
	io.sockets.in(gameNum).emit('server:playerDisconnected');
	io.sockets.in(gameNum).emit('server:message', {msg: leftMessage});
}

function createNewGame () {
  // console.log('creating new game...');
  // make gameId a random number in certain range hue hue hue
	var thisGameId = Math.floor((Math.random() * 3141592) + 1);
	thisGameId = thisGameId.toString();
  // 'this' is a reference to the calling client's socket.io object
  // game rooms are identified with a leading '#'
	this.join('#' + thisGameId);
  // send new list of games to clients in home state
	sendGames();
  // add this game to our 'global' games object
	gamesObj['#' + thisGameId] = new game();
  // TODO: put these queries in a function
	model.find({color: 'black', numWhites: '2'}, 'text numWhites', function (err, cards) {
		gamesObj['#' + thisGameId].blackCards = cards;
		gamesObj['#' + thisGameId].blackCardsOrig = cards;
	});
	model.find({color: 'white'}, 'text', function (err, cards) {
		gamesObj['#' + thisGameId].whiteCards = cards;
		gamesObj['#' + thisGameId].whiteCardsOrig = cards;
	});
	this.emit('server:createSuccess', {gameId: thisGameId});
  //console.log(gamesObj);
}

function joinGame (data) {
  // console.log('a client is attempting join a game...');
  // reference to the calling client's socket.io object
	var sock = this;
	// get a room called #<gameID> from socket.io adapter,
	var gameNum = '#' + data.gameId;
	var room = gameSocket.adapter.rooms[gameNum];
	// ff the room exists...
	if (room !== undefined) {
		// join the room
		sock.join(gameNum);
		// tell the client we were successful
		sock.emit('server:joinSuccess');
		socketsObj[this.id] = new socketInfo(gameNum);
		gamesObj[gameNum].players.push(this.id);
		// console.log('  the client joined game ' + data.gameId + ' successfully.');
	} else {
		sock.emit('server:joinFailure');
		// console.log('  the client failed to join game ' + data.gameId);
	}
}

function leaveGame (data) {
	this.leave(socketsObj[this.id].room);
	emitLeave(this.id);
	socketsObj[this.id].room = null;
}

// add to default name to corresponding socketsObj
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
  // console.log('forwarding games list to a client...');
	var rooms = gameSocket.adapter.rooms;
	var gameRooms = [];
	for(var room in rooms) {
		if(room[0] == '#') {
			if(gamesObj[room] !== undefined) {
				var numPlayers = gamesObj[room].players.length;
				var gameNum = room.slice(1);
				var game = {gameNum: gameNum, numPlayers: numPlayers};
				gameRooms.push(game);
			}
		}
	}
	// send array of gameIDs to all clients in home state
	io.sockets.emit('server:games', {games: gameRooms});
}

function disconnect () {
	//console.log('client ' + this.id + ' disconnected');
	leaveGame(this.id);
	sendGames();
}

// TODO: delete gamesObj if last player leaves
function leaveGame (socketId) {
	if(socketsObj[socketId] === undefined) {
		return;
	}
	else {
		emitLeave(socketId);
		var gameNum = socketsObj[socketId].room;
		var index = gamesObj[gameNum].players.indexOf(socketId);
		if(index === -1) { // this is hacky
			return;
		}
		else {
			gamesObj[gameNum].players.splice(index, 1);
			delete socketsObj[this.id];
		}
	}
}

function exitGame () {
	this.leave(socketsObj[this.id].room);
	leaveGame(this.id);
	sendGames();
}
