var io;
var gameSocket;
var gamesObj;
var socketsObj;

exports.initScoreboard = function (sio, socket, games, socketsInfo) {
	io = sio;
	gameSocket = socket;
	gamesObj = games;
	socketsObj = socketsInfo;
	
	gameSocket.on('client:joinSuccess', updatePlayerLists);
	gameSocket.on('client:getPlayerList', sendPlayerList);
};

function updatePlayerLists () {
	//var gameNum = '#' + data.gameId;
	var gameNum = socketsObj[this.id].room;
	var players = [];
	var sockets = gameSocket.adapter.rooms[gameNum];
	sockets = Object.keys(sockets);
	for (var i = 0; i<sockets.length; i++) {
		players.push(socketsObj[sockets[i]].name);
	}
	// send new player list to all clients in room
	io.sockets.in(gameNum).emit('server:players', {players: players});	
}

function sendPlayerList () {
	var sock = this;
	var gameNum = socketsObj[this.id].room;
	var players = [];
	var sockets = gameSocket.adapter.rooms[gameNum];
	sockets = Object.keys(sockets);
	for (var i = 0; i<sockets.length; i++) {
		players.push(socketsObj[sockets[i]].name);
	}
	// send new player list to 'this' client
	sock.emit('server:players', {players: players});	
}