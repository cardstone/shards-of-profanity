(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController($scope) {
		var play = this;
		var socket = $scope.mySocket;
		$scope.hand = [];

		socket.on('server:whiteCard', function (data) {
			//console.log('got card');
			$scope.card = data.card.text;
			$scope.hand.push(data.card);
		});

		play.getRandWhite = function() {
			socket.emit('client:getRandWhite');
		}

		play.getRandBlack = function() {
			socket.emit('client:getRandBlack');
		}
	}

})();
