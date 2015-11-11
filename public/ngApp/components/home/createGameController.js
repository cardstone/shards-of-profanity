(function () {
	'use strict';

	angular
		.module('app')
		.controller('createGameController', ['$scope', '$state', '$stateParams', 'SocketService', createGameController]);

	function createGameController($scope, $state, $stateParams, SocketService) {
		$scope.gameName = "shitty-default-name";
	   	$scope.maxPlayers = {
		    options: [
			    {num: 3},
			    {num: 4},
			    {num: 5},
			    {num: 6},
			    {num: 7},
			    {num: 8},
			    {num: 9},
			    {num: 10},
		    ],
    		selectedOption: {num: 3, name: '3 players'}
    	};
		$scope.privateMatch = {
			options: [
				{val: 0, name: 'public'},
				{val: 1, name: 'private'},
			],
			selectedOption: {val: 0, name: 'public'}
		};
		$scope.maxPoints = {
			options: [
			    {num: 5},
			    {num: 10},
			    {num: 15},
			    {num: 20},
			    {num: 25},
			    {num: 30},
		    ],
    		selectedOption: {num: 5}
		}; 

		SocketService.on('server:createSuccess', function (data) {
			$state.go('joinGame', {
				gameId: data.gameId,
				host: true
			});
		});

		$scope.createNewGame = function () {
			SocketService.emit('client:createNewGame', {
				gameName: $scope.gameName,
				maxPlayers: $scope.maxPlayers.selectedOption.num,
				privateMatch: $scope.privateMatch.selectedOption.val,
				maxPoints: $scope.maxPoints.selectedOption.num
			});
		};

	}
})();
