(function () {
	'use strict';

	angular
		.module('app')
		.controller('ScoreboardController', ['$scope', ScoreboardController]);

	function ScoreboardController ($scope) {
		var scoreboardCtrl = this;
		var socket = $scope.mySocket;
	 	var myGameId = $scope.myGameId;
	 	var myName = $scope.myName;

	 	scoreboardCtrl.players = [];

	 	socket.on('server:players', function (data) {
	 		scoreboardCtrl.players = data.players;
	 	});

	}
})();