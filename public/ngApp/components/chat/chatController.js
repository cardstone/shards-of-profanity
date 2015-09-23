(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChatController', ['$stateParams', ChatController]);

	// socket client
	// socket server in /config/socket.js
	function ChatController($stateParams) {
		// map 'this' to a variable to avoid scoping issues
		var chatCtrl = this;
		var gameData = $stateParams.myParam;
	 	var myGameId = gameData.gameId;
	 	var socket = gameData.socket;
	 	chatCtrl.messages = [];

	 	chatCtrl.messages.push('Welcome to game ' + myGameId);

		// listen for socket events
		socket.on('server:message', function (data) {
			chatCtrl.messages.push(data.msg);
		});

		socket.on('client:message', function (data) {
			chatCtrl.messages.push(data.msg);
		});

		// emit message event to server
		chatCtrl.sendMessage = function () {
			socket.emit('client:message', {gameId: myGameId, msg: chatCtrl.msg});
			chatCtrl.msg = '';
		};
	}
})();
