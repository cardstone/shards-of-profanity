(function () {
	'use strict';

	angular
		.module('app')
		.controller('ChatController', ['$scope', ChatController]);

	// chat client
	function ChatController($scope) {
		// map 'this' to a variable to avoid scoping issues
		var vm = this;
		// get variables from our parent state scope
		var socket = $scope.mySocket;
		var myGameId = $scope.myGameId;
		// var myName = $scope.myName;

		vm.show = true;
		vm.msg = ``;
		vm.messages = [];

		vm.messages.push({
			name: 'SERVER',
			avatar: 'icons/robot.svg',
			msg: `Welcome to game ${myGameId} ya filthy animal.`
		});
		vm.messages.push({
			name: 'SERVER',
			avatar: 'icons/robot.svg',
			msg: `Misery loves company so give this url to a friend: localhost:4000/join/${myGameId}`
		});

		// listen for socket events
		socket.on('server:message', function (data) {
			vm.messages.push({
				name: 'SERVER',
				avatar: 'icons/robot.svg',
				msg: data.msg
			});
		});

		socket.on('client:message', function (data) {
			vm.messages.push(data);
		});

		// emit message event to server
		vm.sendMessage = function () {
			socket.emit('client:message', {
				msg: vm.msg
			});
			vm.msg = '';
		};
	}
})();
