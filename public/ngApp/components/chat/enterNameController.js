(function () {
	'use strict';

	angular
		.module('app')
		.controller('EnterNameController', ['$scope', EnterNameController]);

	function EnterNameController ($scope) {
		var vm = this;
		var socket = $scope.mySocket;

		vm.myName = '';
		vm.show = true;

		vm.turnOffThisView = function () {
			vm.show = false;
		};

		vm.enter = function () {
			socket.emit('client:enterName', {playerName: vm.myName});
			socket.emit('client:getPlayerList');
			socket.emit('client:updateName');
			vm.turnOffThisView();
		};
	}
})();
