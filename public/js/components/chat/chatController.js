(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChatController', ['SocketService', ChatController]);

	// socket client
	// socket server in /config/socket.js
	function ChatController(SocketService) {
		// map this to a variable to avoid scoping issues
		var chatCtrl = this;
		chatCtrl.messages = [];

		// listen for socket events
		SocketService.on('server:message', function (msg) {
			chatCtrl.messages.push(msg);
		});

		SocketService.on('user:message', function (msg) {
			chatCtrl.messages.push(msg);
		});

		// emit message event to server
		chatCtrl.sendMessage = function () {
			SocketService.emit('user:message', chatCtrl.msg);
			chatCtrl.messages.push(chatCtrl.msg);
			chatCtrl.msg = '';
		};
	}
})();
