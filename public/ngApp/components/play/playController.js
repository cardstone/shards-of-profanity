(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController($scope) {
		var vm = this;
		var socket = $scope.mySocket;
		$scope.hand = [];

		socket.on('server:whiteCard', function (data) {
			$scope.hand.push.apply($scope.hand, data.cards);
		});

		vm.getRandWhite = function(numCards) {
			socket.emit('client:getRandWhite', {numCards: numCards});
		};

		vm.getRandBlack = function() {
			socket.emit('client:getRandBlack');
		};
	}

})();
