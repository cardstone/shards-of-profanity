(function () {
	'use strict';

	angular
	    .module('app')
	    .controller('GameController', ['$state', '$stateParams', GameController]);


	 function GameController ($state, $stateParams) {
	 	var gameCtrl = this;
	 	gameCtrl.message = 'Hello';
	 	var gameData = $stateParams.myParam;
	 	var myGameId = gameData.gameId;
	 	var socket = gameData.socket;

	 	socket.on('server:message', function (data) {
	 		gameCtrl.message = data.msg;
	 	});

	 	gameCtrl.sendMessage = function () {
	 		socket.emit('client:sendMessage', {gameId: myGameId});
	 	};
	 }
})();