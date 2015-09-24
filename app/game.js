var io;
var gamesocket;


exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;

  // listen for events from client sockets
  gameSocket.on('client:createNewGame', createNewGame);
  gameSocket.on('client:getGames', getGames);
  gameSocket.on('client:joinGame', joinGame);
  gameSocket.on('client:message', sendMessage);
  gameSocket.on('disconnect', disconnect);
};

function createNewGame () {
  // console.log('creating new game...');
  // make gameId a random number in certain range hue hue hue
  var thisGameId = Math.floor((Math.random() * 3141592) + 1); 
  thisGameId = thisGameId.toString();
  // 'this' is a reference to the calling client's socket.io object 
  // game rooms are identified with a leading '#'
  this.join('#' + thisGameId);
  this.emit('server:joinSuccess', {gameId: thisGameId});
  getGames();
}

function getGames () {
  // console.log('forwarding games list to a client...');
  var rooms = gameSocket.adapter.rooms;
  var gameRooms = [];
  for(var room in rooms) {
    if(room[0] == '#') { 
      gameRooms.push(room.slice(1));
    }
  }
  // send array of gameIDs to all clients
  io.sockets.emit('server:games', {games: gameRooms});
}

function joinGame (data) {
  // console.log('a client is attempting join a game...');
  // reference to the calling client's socket.io object
  var sock = this;
  // get a room called #<gameID> from socket.io adapter,
  var gameNum = '#' + data.gameId;
  var room = gameSocket.adapter.rooms[gameNum];
  // ff the room exists...
  if (room !== undefined) {
    // join the room
    sock.join(gameNum);
    // tell the client we were successful 
    sock.emit('server:joinSuccess', {
      gameId: data.gameId
    });
    // console.log('	the client joined game ' + data.gameId + ' successfully.');
  } else {
    sock.emit('server:joinFailure');
    // console.log('	the client failed to join game ' + data.gameId);
  }
}

function sendMessage (data) {
  // console.log('client sending message...');
  var gameNum = '#' + data.gameId;
  // console.log('   to room ' + gameNum);
  io.sockets.in(gameNum).emit('client:message', {playerName: data.playerName, msg: data.msg});
}

function disconnect () {
  // console.log('a client disconnected');
  // when a client disconnects, resend an array of gameIDs because,
  // if the last client in room disconnects, the room will be deleted
  getGames();
}
