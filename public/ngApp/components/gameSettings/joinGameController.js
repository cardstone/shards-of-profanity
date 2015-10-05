(function () {
	'use strict';

	angular
		.module('app')
		.controller('JoinGameController', [
			'$state',
			'$stateParams',
			'SocketService',
			'AvatarService',
			JoinGameController]);

	function JoinGameController ($state, $stateParams, SocketService, AvatarService) {
		var gameId = $stateParams.gameId;
		SocketService.emit('client:joinGame', {gameId: gameId});

		SocketService.on('server:joinSuccess', function (data) {
	      	$state.go('game', {
		        myParam: {
							mySocket: SocketService,
							myGameId: gameId,
							myName: 'noob-default-name',
							myAvatar: AvatarService.get()
		        }
			});
		});

		SocketService.on('server:joinFailure', function () {
			$state.go('gameNotFound');
		});
	}
})();
