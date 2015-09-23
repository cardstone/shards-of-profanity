(function () {
	'use strict';

	angular
		.module('app')
		.controller('GameController', ['$scope', '$state',  '$stateParams', GameController]);

	function GameController ($scope, $state, $stateParams) {
		var gameCtrl = this;
		var gameData = $stateParams.myParam;
		$scope.mySocket = gameData.mySocket;
		$scope.myGameId = gameData.myGameId;
		$scope.myName = gameData.myName;

		$state.go('game.components');
	}
})();