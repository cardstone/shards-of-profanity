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
	gameSocket.on('client:updateName', updatePlayerLists);
	gameSocket.on('client:getUpdatedPlayerList', sendPlayerList);
	gameSocket.on('client:roundWinner', addPoints);
};

function getPlayerList (gameNum) {
	var players = [];
	var sockets = gameSocket.adapter.rooms[gameNum];
	sockets = Object.keys(sockets);
	for (var i = 0; i<sockets.length; i++) {
		players.push({
			name: socketsObj[sockets[i]].name,
			avatar: socketsObj[sockets[i]].avatar,
			points: socketsObj[sockets[i]].points
		});
	}
	return players;
}

function updatePlayerLists () {
	var gameNum = socketsObj[this.id].room;
	var players = getPlayerList(gameNum);
	// send new player list to all clients in room gameNum
	io.sockets.in(gameNum).emit('server:players', {players: players});
}

function sendPlayerList () {
	var gameNum = socketsObj[this.id].room;
	var players = getPlayerList(gameNum);
	// send new player list to 'this' client
	this.emit('server:players', {players: players});
}

function addPoints (data) {
	socketsObj[data.id].points += 1;
	var gameNum = socketsObj[this.id].room;
	if(socketsObj[data.id].points===gamesObj[gameNum].maxPoints) {
		console.log("Max Points Reached!");
	} 
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:players', {players: players});
}
