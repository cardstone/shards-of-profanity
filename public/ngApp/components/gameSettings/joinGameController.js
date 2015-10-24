(function () {
	'use strict';

	angular
		.module('app')
		.controller('JoinGameController', [
			'$state',
			'$stateParams',
			'SocketService',
			'AvatarService',
			'NameService',
			JoinGameController]);

	function JoinGameController ($state, $stateParams, SocketService, AvatarService, NameService) {
		var gameId = $stateParams.gameId;

		SocketService.on('server:joinSuccess', function() {
			$state.go('game', {
				myParam: {
					mySocket: SocketService,
					myGameId: gameId,
					myName: NameService.get(),
					myAvatar: AvatarService.get(),
					host: $stateParams.host
				}
			});
		});

		SocketService.on('server:joinFailure', function () {
			$state.go('gameNotFound');
		});

		SocketService.emit('client:joinGame', {gameId: gameId});
	}
})();
