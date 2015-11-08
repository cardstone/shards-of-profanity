(function () {
	'use strict';

	angular
		.module('app')
		.controller('createGameController', ['$scope', '$state', '$stateParams', 'SocketService', createGameController]);

	function createGameController($scope, $state, $stateParams, SocketService) {
		$scope.gameName = "Poopy-default-game-name.";
	   	$scope.maxPlayers = {
		    options: [
			    {num: 3, name: '3 players'},
			    {num: 4, name: '4 noobcakes'},
			    {num: 5, name: '5 donald trumps'},
			    {num: 6, name: '6 shitheads'},
			    {num: 7, name: '7 fuckfaces'},
			    {num: 8, name: '8 asshats'},
			    {num: 9, name: '9 bonerbiters'},
			    {num: 10, name: '10 grapples'},
		    ],
    		selectedOption: {num: 3, name: '3 players'}
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
				maxPlayers: $scope.maxPlayers.selectedOption.num
			});
		};

	}
})();
