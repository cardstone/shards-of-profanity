(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope',
										'$timeout',
										'$interval',
										PlayController]);

	function PlayController($scope, $timeout, $interval) {
		var vm = this;
		var socket = $scope.mySocket;
		$scope.black = []; // TODO: make this not an array?
		$scope.hand = [];
		$scope.submissions = [];
		$scope.winningCards = [];
		$scope.czar = false;
		$scope.numToSubmit = 0;
		$scope.submitCountdown = 0;
		$scope.faceUp = false;
		$scope.showWinner = false;

		socket.on('server:czar', function () {
			$scope.czar = true;
		});

		socket.on('server:unCzar', function () {
			$scope.czar = false;
		});

		socket.on('server:whiteCard', function (data) {
			if($scope.hand.length == 10) {
				var numNewCards = data.cards.length;
				$scope.hand.splice(0, numNewCards);
			}
			$scope.hand.push.apply($scope.hand, data.cards);
		});

		socket.on('server:displayWinner', function (data) {
			$scope.showWinner = true;
			var card = $scope.submissions[data.index].card;
			$scope.winningCards.push(card);
		});

		socket.on('server:displayWhite', function (data) {
			$scope.submissions.push(data);
		});

		socket.on('server:displayBlack', function (data) {
			$scope.black.push(data.card);
			$scope.numToSubmit = Number($scope.black[0].numWhites);
		});

		socket.on('server:enableSubmit', function () {
			$scope.submitCountdown = 10;
			$interval(function(){$scope.submitCountdown--;}, 1000, 10);
			$timeout(roundTimeUp, 11 * 1000);
		});

		socket.on('server:draw', function () {
			vm.drawWhite();
		});

		socket.on('server:newRound', function () {
			$scope.black = [];
			$scope.submissions = [];
			$scope.winningCards = [];
			$scope.faceUp = false;
			$scope.showWinner = false;
		});

		function roundTimeUp () {
			if($scope.numToSubmit > 0) {
				var random = Math.floor(Math.random() * $scope.hand.length);
				vm.submitCard(random);
			}
			$scope.faceUp = true;
		}

		vm.drawBlack = function () {
			socket.emit('client:blackCard');
		};

		vm.drawWhite = function () {
			var numNeeded = 10 - $scope.hand.length;
			if(numNeeded > 0) {
				vm.getRandWhite(numNeeded);
			}
		};

		vm.getRandWhite = function (numCards) {
			socket.emit('client:getRandWhite', {numCards: numCards});
		};

		vm.submitCard = function (index) {
			var card = $scope.hand.splice(index, 1);
			socket.emit('client:whiteSelected', {card: card[0]});
			$scope.numToSubmit--;
		};

		vm.selectWinner = function (index) {
			$scope.czar = false;
			var submission = $scope.submissions[index];
			socket.emit('client:roundWinner', {id: submission.id});
			socket.emit('client:displayWinner', {index: index});
			$timeout(vm.startRound, 5 * 1000);
		};

		vm.startRound = function () {
			$scope.host = false; // TODO: this is hacky, fix
			socket.emit('client:startRound');
		};

		vm.faceUp = function () {
			$scope.faceUp = !$scope.faceUp;
		};
	}

})();
