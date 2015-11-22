exports.initGame = function (io, socket, gamesInfo, socketsInfo) {
	var chat = require('./chat');
	var home = require('./home');
	var scoreboard = require('./scoreboard');
	var play = require('./play');

	home.initHome(io, socket, gamesInfo, socketsInfo);
	chat.initChat(io, socket, socketsInfo);
	scoreboard.initScoreboard(io, socket, gamesInfo, socketsInfo);
	play.initPlay(io, socket, gamesInfo, socketsInfo);
};