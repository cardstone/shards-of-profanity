exports.initGame = function (io, socket, games, socketsInfo) {
	var chat = require('./chat');
	var home = require('./home');
	var scoreboard = require('./scoreboard');
	var play = require('./play');

	home.initHome(io, socket, games, socketsInfo);
	chat.initChat(io, socket, socketsInfo);
	scoreboard.initScoreboard(io, socket, games, socketsInfo);
	play.initPlay(io, socket, games, socketsInfo);
};