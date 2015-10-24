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
		$scope.black = [];
		$scope.hand = [];
		$scope.submissions = []; 
		$scope.czar = false;
		$scope.submitEnabled = false;
		$scope.submitCountdown = 0;
		$scope.faceUp = false;

		socket.on('server:czar', function () {
			console.log('I AM THE CHOSEN ONE');
			$scope.czar = true;
		});

		socket.on('server:unCzar', function () {
			console.log('I AM NO LONGER THE CHOSEN ONE');
			$scope.czar = false;
		});

		socket.on('server:whiteCard', function (data) {
			if($scope.hand.length == 10) {
				var numNewCards = data.cards.length;
				$scope.hand.splice(0, numNewCards);
			}
			$scope.hand.push.apply($scope.hand, data.cards);
		});


		socket.on('server:displayWhite', function (data) {
			$scope.submissions.push(data);
		});

		socket.on('server:displayBlack', function (data) {
			$scope.black.push(data.card);
		});

		socket.on('server:enableSubmit', function () {
			$scope.submitCountdown = 10;
			$scope.submitEnabled = true;
			$interval(function(){$scope.submitCountdown--;}, 1000, 10);
			$timeout(roundTimeUp, 11 * 1000);
		});

		socket.on('server:draw', function () {
			vm.drawWhite();
		});

		socket.on('server:newRound', function () {
			$scope.black = [];
			$scope.submissions = [];
			$scope.faceUp = false;
		});

		function roundTimeUp () {
			console.log('TIME IS UP!');
			if($scope.submitEnabled === true) {
				var random = Math.floor(Math.random() * $scope.hand.length);
				vm.selectCard(random);
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

		vm.selectCard = function (index) {
			$scope.submitEnabled = false;
			var card = $scope.hand.splice(index, 1);
			socket.emit('client:whiteSelected', {card: card[0]});
		};

		vm.selectWinner = function (index) {
			$scope.czar = false;
			var submission = $scope.submissions[index];
			socket.emit('client:roundWinner', {id: submission.id});
		};

		vm.startRound = function () {
			socket.emit('client:startRound');
		};

		vm.faceUp = function () {
			$scope.faceUp = !$scope.faceUp;
		};
	}

})();
