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
		SocketService.emit('client:joinGame', {gameId: gameId});

		SocketService.on('server:joinSuccess', function (data) {
	      	$state.go('game', {
		        myParam: {
							mySocket: SocketService,
							myGameId: gameId,
							myName: NameService.get(),
							myAvatar: AvatarService.get()
		        }
			});
		});

		SocketService.on('server:joinFailure', function () {
			$state.go('gameNotFound');
		});
	}
})();
