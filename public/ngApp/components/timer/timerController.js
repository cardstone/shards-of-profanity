(function () {
	'use strict';

	angular
		.module('app')
		.controller('TimerController', [
			'$scope',
			'$interval',
			'$timeout',
			TimerController
		]);

	function TimerController($scope, $interval, $timeout) {
		var vm = this;
		var socket = $scope.mySocket;
		$scope.roundTime = 0;
		$scope.intermissionTime = 0;
		$scope.czar = false;
		$scope.myStatus = "waiting for host to start..";

		socket.on('server:czar', function () {
			$scope.czar = true;
			$scope.myStatus = "";
		});

		socket.on('server:unCzar', function () {
			$scope.czar = false;
		});

		socket.on('server:displayWinner', function () {
			$scope.intermissionTime = 10;
			$interval(function(){$scope.intermissionTime--;}, 1000, 10);
		});

		socket.on('server:enableSubmit', function () {
			$scope.roundTime = 25;
			$interval(function(){$scope.roundTime--;}, 1000, 25);
			$timeout(roundTimeUp, 25 * 1000);
			if($scope.czar) {
				$scope.myStatus = "waiting for players to submit...";
			}
			else {
				$scope.myStatus = "submit your white cards.";
			}
		});

		function roundTimeUp() {
			if($scope.czar) {
				$scope.myStatus = "select a winner.";
			}
			else {
				$scope.myStatus = "awaiting the Czar's almighty ruling...";
			}
		}
	}
})();
