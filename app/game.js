var io;
var gamesocket;

exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('server:message', {msg: 'You are connected!'});

    gameSocket.on('client:createNewGame', createNewGame);
    gameSocket.on('client:joinGame', joinGame);
    gameSocket.on('client:sendMessage', sendMessage);
}


function createNewGame () {
	console.log('creating new game');
    var thisGameId = ( Math.random() * 100000 ) | 0;
    this.emit('server:newGameCreated', {gameId: thisGameId, mySocketId: this.id});
    this.join(thisGameId.toString());
}

function joinGame (data) {
	console.log('a client is attempting join a game...');
    // A reference to the player's Socket.IO socket object
    var sock = this;

    // Look up the room ID in the Socket.IO manager object.
    var room = gameSocket.adapter.rooms[data.gameId];

    // If the room exists...
    if( room != undefined ) {
        // attach the socket id to the data object.
        data.mySocketId = sock.id;

        // Join the room
        sock.join(data.gameId);
        console.log('	the client joined successfully.');

    } else {
    	console.log('	the client failed to join.');
    }
}

function sendMessage (data) {
	console.log('client sending message:');
	console.log(data.gameId);
	io.sockets.in(data.gameId).emit('server:message', {msg: 'YOU DID IT!'});
}






