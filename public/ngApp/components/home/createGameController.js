(function () {
	'use strict';

	angular
		.module('app')
		.controller('createGameController', ['$scope', '$state', '$stateParams', 'SocketService', createGameController]);

	function createGameController($scope, $state, $stateParams, SocketService) {
		$scope.gameName = "shitty-default-name";
		$scope.maxPlayers = 5;
		$scope.maxPoints = 10;
		$scope.poop = 3;
		$scope.privateMatch = "0";

		SocketService.on('server:createSuccess', function (data) {
			$state.go('joinGame', {
				gameId: data.gameId,
				host: true
			});
		});

		$scope.createNewGame = function () {
			if($scope.privateMatch == "0") {
				$scope.privateMatch = false;
			}
			else {
				$scope.privateMatch = true;
			}
			SocketService.emit('client:createNewGame', {
				gameName: $scope.gameName,
				maxPlayers: $scope.maxPlayers,
				privateMatch: $scope.privateMatch,
				maxPoints: $scope.maxPoints
			});
		};

	}
})();
