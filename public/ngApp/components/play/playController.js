(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController($scope) {
		var vm = this;

		var socket = $scope.mySocket;
		$scope.hand = [];
		$scope.chosen = [];
		$scope.czar = false;

		socket.on('server:czar', function () {
			console.log('I AM THE CHOSEN ONE');
			$scope.czar = true;
		});

		socket.on('server:whiteCard', function (data) {
			if($scope.hand.length == 10) {
				var numNewCards = data.cards.length;
				$scope.hand.splice(0, numNewCards);
			}
			$scope.hand.push.apply($scope.hand, data.cards);
		});


		socket.on('server:displayWhite', function (data) {
			console.log(data);
			$scope.chosen.push(data.card);
		});

		vm.drawWhite = function() {
			var numNeeded = 10 - $scope.hand.length;
			if(numNeeded > 0) {
				vm.getRandWhite(numNeeded);
			}
		};

		vm.getRandWhite = function (numCards) {
			socket.emit('client:getRandWhite', {numCards: numCards});
		};

		vm.getRandBlack = function () {
			socket.emit('client:getRandBlack');
		};

		vm.selectCard = function (index) {
			var card = $scope.hand.splice(index, 1);
			socket.emit('client:whiteSelected', {card: card[0]});
		};
	}

})();
