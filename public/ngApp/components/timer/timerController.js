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
		var submitPromise = null;
		var intermissionPromise= null;
		var countdownPromise = null;

		$scope.$on('$destroy', function () {
			$timeout.cancel(submitPromise);
			$interval.cancel(intermissionPromise);
			$interval.cancel(countdownPromise);

		});

		socket.on('server:czar', function () {
			$scope.czar = true;
			$scope.myStatus = "";
		});

		socket.on('server:unCzar', function () {
			$scope.czar = false;
		});

		socket.on('server:displayWinner', function () {
			$scope.intermissionTime = 10;
			intermissionPromise = $interval(function(){$scope.intermissionTime--;}, 1000, 10);
		});

		socket.on('server:enableSubmit', function () {
			$scope.roundTime = 25;
			countdownPromise = $interval(function(){$scope.roundTime--;}, 1000, 25);
			submitPromise = $timeout(roundTimeUp, 25 * 1000);
			if($scope.czar) {
				$scope.myStatus = "Wait for players to submit their cards";
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
				$scope.myStatus = "Wait for czar's decision";
			}
		}
	}
})();
