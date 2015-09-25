var io;
var gameSocket;

exports.initChat = function (sio, socket) {
	io = sio;
	gameSocket = socket;
	
	gameSocket.on('client:message', sendMessage);
};

function sendMessage (data) {
  // console.log('client sending message...');
  var gameNum = '#' + data.gameId;
  // console.log('   to room ' + gameNum);
  io.sockets.in(gameNum).emit('client:message', {playerName: data.playerName, msg: data.msg});
}