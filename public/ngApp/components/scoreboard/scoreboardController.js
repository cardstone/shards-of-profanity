(function () {
	'use strict';

	angular
		.module('app')
		.controller('ScoreboardController', ['$scope', ScoreboardController]);

	function ScoreboardController ($scope) {
		var scoreboard = this;
		var socket = $scope.mySocket;
	 	var myGameId = $scope.myGameId;
	 	var myName = $scope.myName;

	 	scoreboard.players = [];

	 	socket.on('server:players', function (data) {
	 		scoreboard.players = data.players;
	 	});

	 	socket.on('server:playerDisconnected', function () {
	 		socket.emit('client:getUpdatedPlayerList');
	 	});
	}
})();
