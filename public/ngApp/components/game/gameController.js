(function () {
	'use strict';

	angular
		.module('app')
		.controller('GameController', ['$scope', '$state',  '$stateParams', GameController]);

	function GameController ($scope, $state, $stateParams) {

		console.log('gamectrl');

		var gameCtrl = this;
		var gameData = $stateParams.myParam;
		$scope.mySocket = gameData.mySocket;
		$scope.myGameId = gameData.myGameId;
		$scope.myName = gameData.myName;

		$scope.mySocket.emit('client:joinSuccess', {gameId: $scope.myGameId, 
			playerName: $scope.myName});

		$state.go('game.components');
	}
})();