(function() {
	'use strict';

	angular
		.module('app')
		.controller('joinGameController', ['$scope', '$state', '$stateParams', 'SocketService', joinGameController]);

	function joinGameController($scope, $state, $stateParams, SocketService) {

		$scope.gameToJoin = '';
		$scope.games = [];

		// ask the server for the list of games
		SocketService.emit('client:getGames');

		// listen for events from server
		SocketService.on('server:games', function (data) {
			$scope.games = data.games;
		});

		// controller functions
		$scope.refreshGames = function () {
			SocketService.emit('client:getGames');
		};

		$scope.selectGame = function () {
			// to do?
		};

		$scope.joinGame = function () {
			$state.go('joinGame', {gameId: $scope.gameToJoin});
			$scope.gameToJoin = '';
		};
	}
})();
