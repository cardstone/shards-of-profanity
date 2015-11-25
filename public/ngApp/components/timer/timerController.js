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
		$scope.myStatus = "Waiting for host to start..";

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
				$scope.myStatus = "Wait for all cards to be submitted and then pick a winner";
			}
			else {
				$scope.myStatus = "Submit your white cards.";
			}
		});

		function roundTimeUp() {
			if($scope.czar) {
				$scope.myStatus = "Select a winner.";
			}
			else {
				$scope.myStatus = "Awaiting the Czar's almighty ruling...";
			}
		}
	}
})();
