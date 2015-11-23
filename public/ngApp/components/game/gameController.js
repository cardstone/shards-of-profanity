(function () {
	'use strict';

	angular
		.module('app')
		.controller('GameController', ['$scope', '$state',  '$stateParams', GameController]);

	function GameController ($scope, $state, $stateParams) {

		var gameData = $stateParams.myParam;
		$scope.mySocket = gameData.mySocket;
		$scope.myGameId = gameData.myGameId;
		$scope.myName = gameData.myName;
		$scope.myAvatar = gameData.myAvatar;
		$scope.submitCountdown = 0;
		$scope.host = gameData.host;

		$scope.mySocket.emit('client:joinSuccess', {
			gameId: $scope.myGameId,
			playerName: $scope.myName,
			avatar: $scope.myAvatar
		});

		$state.go('game.components');

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if(fromState.name == 'game.components'){
				// if user navigates away from game view, leave the game.
				$scope.mySocket.emit('client:exitGame');
				// and delete all events this socket is listening to
				$scope.mySocket.removeAllListeners();
				if(toState.name == 'joinGame'){
					// if user navigates using 'back', go to home.
					event.preventDefault();
					$state.go('home');
				}
			}
		});
	}
})();
