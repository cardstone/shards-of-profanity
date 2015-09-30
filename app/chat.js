var io;
var gameSocket;
var socketsObj;

exports.initChat = function (sio, socket, socketsInfo) {
	io = sio;
	gameSocket = socket;
	socketsObj = socketsInfo;

	gameSocket.on('client:message', sendMessage);
	gameSocket.on('client:joinSuccess', messagePlayerJoined);
};

function sendMessage(data) {
	var gameNum = socketsObj[this.id].room;
	var name = socketsObj[this.id].name;
	var msg = data.msg;
	io.sockets.in(gameNum).emit('client:message', {
		name: name,
		msg: msg
	});
}

function messagePlayerJoined(data) {
	var gameNum = socketsObj[this.id].room;
	var name = socketsObj[this.id].name;
	var joinedMessage = name + ' joined the game.';
	io.sockets.in(gameNum).emit('server:message', {
		msg: joinedMessage
	});
}
