(function () {
	'use strict';

	angular
		.module('app')
		.controller('JoinGameController', ['$state', '$stateParams', 'SocketService', JoinGameController]);

	function JoinGameController ($state, $stateParams, SocketService) {
		var gameId = $stateParams.gameId;
		SocketService.emit('client:joinGame', {gameId: gameId});

		SocketService.on('server:joinSuccess', function (data) {
	      	$state.go('game', { 
		        myParam: { 
					mySocket: SocketService, 
					myGameId: gameId,
					myName: 'Anonymous-filthy-casual-guest'
		        }
			});
		});
	}
	
})();