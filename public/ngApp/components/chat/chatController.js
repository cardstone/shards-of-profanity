(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChatController', ['$scope', ChatController]);

	// chat client
	function ChatController ($scope) {
		// map 'this' to a variable to avoid scoping issues
		var chatCtrl = this;
		// get variables from our parent state scope
		var socket = $scope.mySocket;
	 	var myGameId = $scope.myGameId;
	 	var myName = $scope.myName;

	 	chatCtrl.msg ='';
	 	chatCtrl.messages = [];

	 	chatCtrl.messages.push('Waddup ' + myName + '.');
	 	chatCtrl.messages.push('Welcome to game ' + myGameId + ' ya filthy animal.');


		// listen for socket events
		socket.on('server:message', function (data) {
			chatCtrl.messages.push('SERVER: ' + data.msg);
		});

		socket.on('client:message', function (data) {
			chatCtrl.messages.push(data.msg);
		});

		// emit message event to server
		chatCtrl.sendMessage = function () {
			socket.emit('client:message', {msg: chatCtrl.msg});
			chatCtrl.msg = '';
		};
	}
})();
