(function () {
	'use strict';

	angular
		.module('app')
		.controller('createGameController', ['$scope', '$state', '$stateParams', 'SocketService', createGameController]);

	function createGameController($scope, $state, $stateParams, SocketService) {
		SocketService.on('server:createSuccess', function (data) {
			$state.go('joinGame', {gameId: data.gameId, host: true});
		});

		$scope.createNewGame = function () {
			SocketService.emit('client:createNewGame');
		};

	}
})();