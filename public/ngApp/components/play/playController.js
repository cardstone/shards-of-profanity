(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController ($scope) {
		var play = this;
		var socket = $scope.mySocket;
		$scope.hand = [];
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

		play.getRandWhite = function (numCards) {
			socket.emit('client:getRandWhite', {numCards: numCards});
		};

		play.getRandBlack = function () {
			socket.emit('client:getRandBlack');
		};
	}

})();
