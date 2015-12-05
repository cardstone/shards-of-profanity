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
		$scope.roundNum = 0;
		$scope.myStatus = "Waiting for the host to start..";
		var submitPromise = null;
		var intermissionPromise= null;
		var countdownPromise = null;

		$scope.$on('$destroy', function () {
			$timeout.cancel(submitPromise);
			$interval.cancel(intermissionPromise);
			$interval.cancel(countdownPromise);
		});

		socket.on('server:newRound', function (data) {
			$scope.roundNum = data.roundNum;
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
			$scope.myStatus = "Get ready for the next round...";
			intermissionPromise = $interval(function(){$scope.intermissionTime--;}, 1000, 10);
		});

		socket.on('server:enableSubmit', function () {
			$scope.roundTime = 25;
			countdownPromise = $interval(function(){$scope.roundTime--;}, 1000, 25);
			submitPromise = $timeout(roundTimeUp, 25 * 1000);
			if($scope.czar) {
				$scope.myStatus = "Waiting for players to submit their cards...";
			}
			else {
				$scope.myStatus = "Play white cards from your hand.";
			}
		});

		function roundTimeUp() {
			if($scope.czar) {
				$scope.myStatus = "Select the winner.";
			}
			else {
				$scope.myStatus = "Waiting for czar's decision...";
			}
		}
	}
})();
