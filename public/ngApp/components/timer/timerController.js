(function () {
	'use strict';

	angular
		.module('app')
		.controller('TimerController', ['$scope', '$interval', TimerController]);

	function TimerController($scope, $interval) {
		var vm = this;
		var socket = $scope.mySocket;
		$scope.roundTime = 0;
		$scope.czar = false;
		vm.myStatus = "waiting for host to start";

		socket.on('server:czar', function () {
			$scope.czar = true;
		});

		socket.on('server:unCzar', function () {
			$scope.czar = false;
		});

		socket.on('server:enableSubmit', function () {
			$scope.roundTime = 25;
			$interval(function(){$scope.roundTime--;}, 1000, 25);
		});

	}
})();
