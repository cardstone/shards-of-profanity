(function () {
	'use strict';

	angular
		.module('app')
		.controller('EnterNameController', ['$scope', EnterNameController]);

	function EnterNameController ($scope) {
		var enterName = this;
		var socket = $scope.mySocket;

		enterName.myName = '';
		enterName.show = true;

		enterName.turnOffThisView = function () {
			enterName.show = false;
		};

		enterName.enter = function () {
			socket.emit('client:enterName', {playerName: enterName.myName});
			socket.emit('client:getPlayerList');
			socket.emit('client:updateName');
			enterName.turnOffThisView();
		};
	}
})();
