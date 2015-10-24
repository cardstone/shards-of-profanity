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
		$scope.selectedCards = []; 
		$scope.czar = false;
		$scope.selectEnabled = false;
		$scope.selectCountdown = 0;

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
			$scope.selectedCards.push(data.card);
		});

		socket.on('server:displayBlack', function (data) {
			$scope.black.push(data.card);
		});

		socket.on('server:enableSelect', function () {
			$scope.selectCountdown = 10;
			$scope.selectEnabled = true;
			$interval(function(){$scope.selectCountdown--;}, 1000, 10);
			$timeout(roundTimeUp, 11 * 1000);
		});

		socket.on('server:draw', function () {
			vm.drawWhite();
		});

		socket.on('server:newRound', function () {
			$scope.black = [];
			$scope.selectedCards = [];
		});

		function roundTimeUp () {
			console.log('TIME IS UP!');
			if($scope.selectEnabled === true) {
				var random = Math.floor(Math.random() * $scope.hand.length);
				vm.selectCard(random);
			}
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
			$scope.selectEnabled = false;
			var card = $scope.hand.splice(index, 1);
			socket.emit('client:whiteSelected', {card: card[0]});
		};

		vm.startRound = function () {
			socket.emit('client:startRound');
		};
	}

})();
