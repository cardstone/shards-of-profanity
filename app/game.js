var io;
var gamesocket;

var gameIds = [];

exports.initGame = function(sio, socket){

    io = sio;
    gameSocket = socket;

    gameSocket.emit('server:message', {msg: 'You are connected!'});

    // listen for events from clients
    gameSocket.on('client:createNewGame', createNewGame);
    gameSocket.on('client:getGames', getGames);
    gameSocket.on('client:joinGame', joinGame);
    gameSocket.on('client:sendMessage', sendMessage);
}

function createNewGame () {
	console.log('creating new game');
    var thisGameId = ( Math.random() * 100000 ) | 0;
    thisGameId = thisGameId.toString();
    this.join(thisGameId);
    this.emit('server:joinSuccess', {gameId: thisGameId});
    gameIds.push(thisGameId);
    io.sockets.emit('server:games', {games: gameIds});
}

function getGames() {
    console.log('forwarding games list to client');
    this.emit('server:games', {games: gameIds});
}

function joinGame (data) {
	console.log('a client is attempting join a game...');
    // A reference to the client's Socket.IO socket object
    var sock = this;
    // Look up the room ID in the Socket.IO manager object.
    var room = gameSocket.adapter.rooms[data.gameId];
    // If the room exists...
    if( room != undefined ) {
        // attach the socket id to the data object.
        data.mySocketId = sock.id;
        // Join the room
        sock.join(data.gameId);
        sock.emit('server:joinSuccess', {gameId: data.gameId});
        console.log('	the client joined game ' + data.gameId +  ' successfully.');
    } else {
        sock.emit('server:joinFailure');
    	console.log('	the client failed to join game ' + data.gameId);
    }
    //console.log(gameSocket.adapter.rooms);
}

function sendMessage(data) {
  console.log('client sending message:');
  console.log(data.gameId);
  io.sockets.in(data.gameId).emit('server:message', {
    msg: 'YOU DID IT!'
  });
}