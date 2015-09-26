exports.initGame = function (io, socket, games) {
	var chat = require('./chat');
	var home = require('./home');
	var scoreboard = require('./scoreboard');

	chat.initChat(io, socket);
	home.initHome(io, socket, games);
	scoreboard.initScoreboard(io, socket, games);
};