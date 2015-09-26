var io;
var gameSocket;
var gamesObj;

exports.initScoreboard = function (sio, socket, games) {
	io = sio;
	gameSocket = socket;
	gamesObj = games;
	
	gameSocket.on('client:joinSuccess', sendPlayerList);
};

function sendPlayerList (data) {
	var gameNum = '#' + data.gameId;
	io.sockets.in(gameNum).emit('server:players', {players: gamesObj[data.gameId].players});
}