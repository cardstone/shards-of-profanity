(function() {
	'use strict';

	angular
		.module('app')
		.controller('JoinGameController', ['$scope', '$state', '$stateParams', 'SocketService', JoinGameController]);

	function JoinGameController($scope, $state, $stateParams, SocketService) {

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

		$scope.selectGame = function (index) {
			var gameNum = $scope.games[index].gameNum;
			$state.go('joinGame', {gameId: gameNum, host: false});
		};

		$scope.joinGame = function () {
			$state.go('joinGame', {gameId: $scope.gameToJoin, host: false});
			$scope.gameToJoin = '';
		};
	}
})();
