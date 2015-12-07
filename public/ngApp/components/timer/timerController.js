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
		$scope.numPlayers = 0;
		$scope.numSubmitted = 0;
		$scope.roundTime = 0;
		$scope.intermissionTime = 0;
		$scope.czar = false;
		$scope.roundNum = 0;
		$scope.myStatus = null;
		var submitPromise = null;
		var intermissionPromise= null;
		var countdownPromise = null;

		if ($scope.host) {
			$scope.myStatus = "Start the game when there are at least 3 other players.";
		}
		else {
			$scope.myStatus = "Waiting for the host to start...";
		}

		$scope.$on('$destroy', function () {
			$timeout.cancel(submitPromise);
			$interval.cancel(intermissionPromise);
			$interval.cancel(countdownPromise);
		});

		socket.on('server:newRound', function (data) {
			$scope.roundNum = data.roundNum;
			$scope.numSubmitted = 0;
		});

		socket.on('server:czar', function () {
			$scope.czar = true;
			$scope.myStatus = "";
		});

		socket.on('server:unCzar', function () {
			$scope.czar = false;
		});

		socket.on('server:players', function (data) {
			//does not count czar
			$scope.numPlayers = data.players.length;
		});

		socket.on('server:displayWhite', function () {
			$scope.numSubmitted++;
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
				$scope.myStatus = "Submit white cards from your hand to complete the black card.";
			}
		});

		function roundTimeUp() {
			if($scope.czar) {
				$scope.myStatus = "Select the submission that makes you lol the most.";
			}
			else {
				$scope.myStatus = "Awaiting the Card-Czar's decision...";
			}
		}
	}
})();
