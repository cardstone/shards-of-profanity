(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController($scope) {
		var play = this;
		var socket = $scope.mySocket;

		socket.on('server:card', function (data) {
			//console.log('got card');
			$scope.card = data.card.text;
		});

		play.getRandomCard = function() {
			socket.emit('client:getRandomCard');
		}
	}

})();
