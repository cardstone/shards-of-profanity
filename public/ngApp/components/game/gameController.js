(function () {
	'use strict';

	angular
		.module('app')
		.controller('GameController', ['$scope', '$state',  '$stateParams', GameController]);

	function GameController ($scope, $state, $stateParams) {
		var game = this;

		var gameData = $stateParams.myParam;
		$scope.mySocket = gameData.mySocket;
		$scope.myGameId = gameData.myGameId;
		$scope.myName = gameData.myName;
		$scope.myAvatar = gameData.myAvatar;

		$scope.mySocket.emit('client:joinSuccess', {
			gameId: $scope.myGameId,
			playerName: $scope.myName,
			avatar: $scope.myAvatar
		});

		$state.go('game.components');

		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		    if((fromState.name=='game.components')&&(toState.name=='joinGame')) {
		    	event.preventDefault();
		    	$state.go('home');
		    } 
		});
	}
})();
