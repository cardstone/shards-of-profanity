(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChatController', ['$stateParams', ChatController]);

	// chat client
	function ChatController($stateParams) {
		// map 'this' to a variable to avoid scoping issues
		var chatCtrl = this;
		// get data passed into the state 
		var gameData = $stateParams.myParam;
	 	var myGameId = gameData.gameId;
	 	var socket = gameData.socket;
	 	chatCtrl.msg ='';
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
