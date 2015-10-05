var io;
var gameSocket;
var gamesObj;
var socketsObj;

exports.initHome = function (sio, socket, games, socketsInfo) {
	io = sio;
	gameSocket = socket;
  gamesObj = games;
  socketsObj = socketsInfo;

  // listen for events from clients
	gameSocket.on('client:createNewGame', createNewGame);
	gameSocket.on('client:joinGame', joinGame);
  gameSocket.on('client:joinSuccess', addDefaultName);
  gameSocket.on('client:enterName', enterName);
  gameSocket.on('client:getGames', getGames);
  gameSocket.on('client:leaveGame', leaveGame);
	gameSocket.on('disconnect', disconnect);
};

// game object constructor
function game () {
  this.players = [];
}

// socketInfo object constructor
function socketInfo (room) {
  this.room = room;
  this.name = null;
  this.avatar = null;
}

function createNewGame () {
  // console.log('creating new game...');
  // make gameId a random number in certain range hue hue hue
  var thisGameId = Math.floor((Math.random() * 3141592) + 1);
  thisGameId = thisGameId.toString();
  // 'this' is a reference to the calling client's socket.io object
  // game rooms are identified with a leading '#'
  this.join('#' + thisGameId);
  // send new list of games to clients in home state
  getGames();
  // add this game to our 'global' games object
  gamesObj['#' + thisGameId] = new game();
  this.emit('server:createSuccess', {gameId: thisGameId});
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
    socketsObj[this.id] = new socketInfo(gameNum);
    gamesObj[gameNum].players.push(this.id);
    // console.log('  the client joined game ' + data.gameId + ' successfully.');
  } else {
    sock.emit('server:joinFailure');
    // console.log('  the client failed to join game ' + data.gameId);
  }
}

// TODO: leaveGame() and disconnect() have similar code,
// put common code in helper function
function leaveGame (data) {
  var gameNum = socketsObj[this.id].room;
  var name = socketsObj[this.id].name;
  this.leave(gameNum);
  socketsObj[this.id].room = null;
  var leftMessage = name + ' has left the game. What a quitter.';
  io.sockets.in(gameNum).emit('server:playerDisconnected');
  io.sockets.in(gameNum).emit('server:message', {msg: leftMessage});
}

// add to default name to corresponding socketsObj
function addDefaultName (data) {
  socketsObj[this.id].name = data.playerName;
  socketsObj[this.id].avatar = data.avatar;
}

function enterName (data) {
  var newName = data.playerName;
  var oldName = socketsObj[this.id].name;
  var gameNum = socketsObj[this.id].room;
  socketsObj[this.id].name = newName;
  var msg = oldName + ' has been renamed ' + newName;
  io.sockets.in(gameNum).emit('server:message', {msg: msg});
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
  // send array of gameIDs to all clients in home state
  io.sockets.emit('server:games', {games: gameRooms});
}

// TO DO: maybe clean this up and restructure
function disconnect () {
  //console.log('client ' + this.id + ' disconnected');
  if(socketsObj[this.id] !== undefined)
  {
    var gameNum = socketsObj[this.id].room;
    var name = socketsObj[this.id].name;
    var leftMessage = name + ' has left the game. What a quitter.';
    io.sockets.in(gameNum).emit('server:playerDisconnected');
    io.sockets.in(gameNum).emit('server:message', {msg: leftMessage});
    delete socketsObj[this.id];
  }
  getGames();
}
