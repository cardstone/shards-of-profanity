(function () {
	'use strict';

	angular
		.module('app')
		.controller('createGameController', ['$scope', '$state', '$stateParams', 'SocketService', createGameController]);

	function createGameController($scope, $state, $stateParams, SocketService) {
		$scope.gameName = null;

		SocketService.on('server:createSuccess', function (data) {
			$state.go('joinGame', {gameId: data.gameId, host: true});
		});

		$scope.createNewGame = function () {
			SocketService.emit('client:createNewGame', {gameName: $scope.gameName});
		};

	}
})();
