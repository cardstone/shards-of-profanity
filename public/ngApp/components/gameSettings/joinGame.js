(function () {
	'use strict';

	angular
		.module('app')
		.controller('JoinGame', [
			'$state',
			'$stateParams',
			'SocketService',
			'AvatarService',
			'NameService',
			JoinGame
		]);

	function JoinGame ($state, $stateParams, SocketService, AvatarService, NameService) {
		var gameId = $stateParams.gameId;

		SocketService.on('server:joinSuccess', function() {
			var userName = prompt('Please enter a username');
			if(userName == null){
				userName = NameService.get();
			}
			$state.go('game', {
				myParam: {
					mySocket: SocketService,
					myGameId: gameId,
					//myName: NameService.get(),
					myName: userName,
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
