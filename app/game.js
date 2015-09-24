var io;
var gamesocket;

var gameIds = [];

exports.initGame = function (sio, socket) {

  io = sio;
  gameSocket = socket;

  gameSocket.emit('server:message', {
    msg: 'You are connected!'
  });

  // listen for events from clients
  gameSocket.on('client:createNewGame', createNewGame);
  gameSocket.on('client:getGames', getGames);
  gameSocket.on('client:joinGame', joinGame);
  gameSocket.on('client:message', sendMessage);
  gameSocket.on('disconnect', disconnect);
};

function createNewGame () {
  //console.log('creating new game...');
  var thisGameId = (Math.random() * 100000) | 0;
  thisGameId = thisGameId.toString();
  this.join('#' + thisGameId);
  this.emit('server:joinSuccess', {gameId: thisGameId});
  gameIds.push(thisGameId);
  //io.sockets.emit('server:games', {games: gameIds});
}

function getGames () {
  //console.log('forwarding games list to client...');
  var rooms = gameSocket.adapter.rooms;
  var gameRooms = [];
  for(var room in rooms) {
    if(room[0] == '#') { 
      //console.log(room);
      gameRooms.push(room.slice(1));
    }
  }
  gameSocket.emit('server:games', {games: gameRooms});
}

function joinGame (data) {
  //console.log('a client is attempting join a game...');
  // A reference to the client's Socket.IO socket object
  var sock = this;
  // Look up the room ID in the Socket.IO manager object.
  var gameNum = '#' + data.gameId;
  var room = gameSocket.adapter.rooms[gameNum];
  //console.log(gameSocket.adapter.rooms);
  // If the room exists...
  if (room !== undefined) {
    // attach the socket id to the data object.
    data.mySocketId = sock.id;
    // Join the room
    sock.join(gameNum);
    // Tell the client we were successful 
    sock.emit('server:joinSuccess', {
      gameId: data.gameId
    });
    //console.log('	the client joined game ' + data.gameId + ' successfully.');
  } else {
    sock.emit('server:joinFailure');
    //console.log('	the client failed to join game ' + data.gameId);
  }
}

function sendMessage (data) {
  //console.log('client sending message...');
  var gameNum = '#' + data.gameId;
  //console.log('   to room ' + gameNum);
  io.sockets.in(gameNum).emit('client:message', {playerName: data.playerName, msg: data.msg});
}

function disconnect () {
  //console.log('a client disconnected');
}
