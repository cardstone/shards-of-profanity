var io;
var gameSocket;

exports.initChat = function (sio, socket) {
	io = sio;
	gameSocket = socket;
	
	gameSocket.on('client:message', sendMessage);
	gameSocket.on('client:joinSuccess', messagePlayerJoined);
};

function sendMessage (data) {
	// console.log('client sending message...');
	var gameNum = '#' + data.gameId;
	// console.log('   to room ' + gameNum);
	io.sockets.in(gameNum).emit('client:message', {playerName: data.playerName,
		msg: data.msg});
}

function messagePlayerJoined (data) {
	var gameNum = '#' + data.gameId;
	var joinedMessage = data.playerName + ' joined the game.';
	io.sockets.in(gameNum).emit('server:message', {msg: joinedMessage});
}