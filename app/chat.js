var io;
var gameSocket;
var socketsObj;

exports.initChat = function (sio, socket, socketsInfo) {
	io = sio;
	gameSocket = socket;
	socketsObj = socketsInfo;

	gameSocket.on('client:message', sendMessage);
	gameSocket.on('client:joinSuccess', messagePlayerJoined);
	gameSocket.on('client:displayWinner', messagePlayerWon);
};

function sendMessage(data) {
	var gameNum = socketsObj[this.id].room;
	var name = socketsObj[this.id].name;
	io.sockets.in(gameNum).emit('client:message', {
		name: name,
		msg: data.msg,
		avatar: socketsObj[this.id].avatar
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

function messagePlayerWon(data){
	var gameNum = socketsObj[this.id].room;
	var name = socketsObj[this.id].name;
	var winningMessage = name + ' won the round!';
	io.sockets.in(gameNum).emit('server:message', {
		msg: winningMessage
	});
}
