(function () {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', ['$state', '$stateParams', 'SocketService', HomeController]);

	function HomeController ($state, $stateParams , SocketService) {
		var vm = this;
		vm.gameToJoin = '';
		vm.games = [];
		console.log('im the eyehole , man!');


    // ask the server for the list of games
		SocketService.emit('client:getGames');

    // listen for events from server
		SocketService.on('server:games', function (data) {
			vm.games = data.games;
		});

		SocketService.on('server:createSuccess', function (data) {
			$state.go('joinGame', {gameId: data.gameId, host: true});
		});

    // controller functions
		vm.createNewGame = function () {
			console.log('creating game');
			SocketService.emit('client:createNewGame');
		};

		vm.refreshGames = function () {
			SocketService.emit('client:getGames');
		};

		vm.selectGame = function () {
      // to do?
		};

		vm.joinGame = function () {
			$state.go('joinGame', {gameId: vm.gameToJoin, host: false});
			vm.gameToJoin = '';
		};
	}
})();
