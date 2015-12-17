var io;
var gameSocket;
var games;
var sockets;

exports.initScoreboard = function (sio, socket, gamesInfo, socketsInfo) {
	io = sio;
	gameSocket = socket;
	games = gamesInfo;
	sockets = socketsInfo;

	gameSocket.on('client:joinSuccess', updatePlayerLists);
	gameSocket.on('client:updateAllScoreboard', updatePlayerLists);
	gameSocket.on('client:getUpdatedPlayerList', sendPlayerList);
	gameSocket.on('client:roundWinner', addPoints);
	gameSocket.on('client:enterName', enterName);
};

function getRoom (socketId) {
	if (sockets[socketId] === undefined) {
		return -1;
	}
	else {
		return sockets[socketId].room;
	}
}

function getPlayerList (gameNum) {
	var players = [];
	var connectedSockets = gameSocket.adapter.rooms[gameNum];
	var czar = games[gameNum].czar;
	connectedSockets = Object.keys(connectedSockets);
	for (var i = 0; i < connectedSockets.length; i++) {
		if(i === czar) {
			players.push({
				name: sockets[connectedSockets[i]].name,
				avatar: sockets[connectedSockets[i]].avatar,
				points: sockets[connectedSockets[i]].points,
				czar: true
			});
		}
		else {
			players.push({
				name: sockets[connectedSockets[i]].name,
				avatar: sockets[connectedSockets[i]].avatar,
				points: sockets[connectedSockets[i]].points,
				czar: false
			});
		}
	}
	return players;
}

function updatePlayerLists () {
	var gameNum = getRoom(this.id);
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:players', {players: players});
}

function sendPlayerList () {
	var gameNum = getRoom(this.id);
	var players = getPlayerList(gameNum);
	this.emit('server:players', {players: players});
}

function addPoints (data) {
	sockets[data.id].points += 1;
	var gameNum = getRoom(this.id);
	if(sockets[data.id].points == games[gameNum].maxPoints) {	
		io.sockets.in(gameNum).emit('server:gameOver', {gameWinner: sockets[data.id].name});
	} 
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:players', {players: players});
}

function enterName (data) {
	var newName = data.playerName;
	var oldName = sockets[this.id].name;
	var gameNum = getRoom(this.id);
	var msg = oldName + ' has been renamed ' + newName;
	sockets[this.id].name = newName;
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:message', {msg: msg});
	io.sockets.in(gameNum).emit('server:players', {players: players});
}	
