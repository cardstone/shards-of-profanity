exports.initGame = function (io, socket, games, socketsInfo) {
	var chat = require('./chat');
	var home = require('./home');
	var scoreboard = require('./scoreboard');

	home.initHome(io, socket, games, socketsInfo);
	chat.initChat(io, socket);
	scoreboard.initScoreboard(io, socket, games, socketsInfo);
};