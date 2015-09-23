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

		gameCtrl.myName = '';

		gameCtrl.enterName = function () {
			$scope.myName = gameCtrl.myName;
			gameCtrl.myName = '';
			$state.go('game.components');
		};

	}
})();