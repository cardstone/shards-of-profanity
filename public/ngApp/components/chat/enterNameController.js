(function () {
	'use strict';

	angular
		.module('app')
		.controller('EnterNameController', ['$scope', EnterNameController]);

	function EnterNameController ($scope) {
		var enterNameCtrl = this;
		var socket = $scope.mySocket;

		enterNameCtrl.myName = '';
		enterNameCtrl.show = true;

		enterNameCtrl.turnOffThisView = function () {
			enterNameCtrl.show = false;
		}

		enterNameCtrl.enter = function () {
			socket.emit('client:enterName', {playerName: enterNameCtrl.myName});
			socket.emit('client:getPlayerList');
			socket.emit('client:updateName');
			enterNameCtrl.turnOffThisView();
		}
	}
})();