(function () {
	'use strict';

	angular
		.module('app')
		.controller('EnterNameController', ['$scope', EnterNameController]);

	function EnterNameController ($scope) {
		var vm = this;
		var socket = $scope.mySocket;
		vm.showModal = true;
		vm.name = "";

		vm.submitName = function () {
			socket.emit('client:enterName', {playerName: vm.name});
			vm.hide();
		};
		
		vm.hide = function () {
			vm.showModal = false;
		};
	}
})();