(function () {
	'use strict';

	angular
		.module('app')
		.controller('ScoreboardController', ['$scope', ScoreboardController]);

	function ScoreboardController ($scope) {
		var vm = this;
		var socket = $scope.mySocket;
		var myGameId = $scope.myGameId;
		var myName = $scope.myName;

		vm.players = [];

		socket.on('server:players', function (data) {
			vm.players = data.players;
		});

		socket.on('server:playerDisconnected', function () {
			socket.emit('client:getUpdatedPlayerList');
		});
	}
})();
