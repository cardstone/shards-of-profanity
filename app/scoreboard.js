var io;
var gameSocket;
var games;
var socketsObj;

exports.initScoreboard = function (sio, socket, gamesInfo, socketsInfo) {
	io = sio;
	gameSocket = socket;
	games = gamesInfo;
	socketsObj = socketsInfo;

	gameSocket.on('client:joinSuccess', updatePlayerLists);
	gameSocket.on('client:updateAllScoreboard', updatePlayerLists);
	gameSocket.on('client:getUpdatedPlayerList', sendPlayerList);
	gameSocket.on('client:roundWinner', addPoints);
	gameSocket.on('client:enterName', enterName);
};

function getPlayerList (gameNum) {
	var players = [];
	var sockets = gameSocket.adapter.rooms[gameNum];
	var czar = games[gameNum].czar;
	sockets = Object.keys(sockets);
	for (var i = 0; i<sockets.length; i++) {
		if(i === czar) {
			players.push({
				name: socketsObj[sockets[i]].name,
				avatar: socketsObj[sockets[i]].avatar,
				points: socketsObj[sockets[i]].points,
				czar: true
			});
		}
		else {
			players.push({
				name: socketsObj[sockets[i]].name,
				avatar: socketsObj[sockets[i]].avatar,
				points: socketsObj[sockets[i]].points,
				czar: false
			});
		}
	}
	return players;
}

function updatePlayerLists () {
	var gameNum = socketsObj[this.id].room;
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:players', {players: players});
}

function sendPlayerList () {
	var gameNum = socketsObj[this.id].room;
	var players = getPlayerList(gameNum);
	this.emit('server:players', {players: players});
}

function addPoints (data) {
	socketsObj[data.id].points += 1;
	var gameNum = socketsObj[this.id].room;
	if(socketsObj[data.id].points === games[gameNum].maxPoints) {
		console.log("Max Points Reached!");
		//TODO: GAME WINNING LOGIC HERE
	} 
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:players', {players: players});
}

function enterName (data) {
	var newName = data.playerName;
	var oldName = socketsObj[this.id].name;
	var gameNum = socketsObj[this.id].room;
	var msg = oldName + ' has been renamed ' + newName;
	socketsObj[this.id].name = newName;
	var players = getPlayerList(gameNum);
	io.sockets.in(gameNum).emit('server:message', {msg: msg});
	io.sockets.in(gameNum).emit('server:players', {players: players});
}	
