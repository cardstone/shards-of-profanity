(function () {
	'use strict';

	angular
		.module('app')
		.controller('PlayController', ['$scope', PlayController]);

	function PlayController($scope) {
		var play = this;
		var socket = $scope.mySocket;
		play.color = null;

		socket.on('server:card', function (data) {
			//console.log('got card');
			$scope.card = data.card.text;
		});

		play.getRandWhite = function() {
			socket.emit('client:getRandomCard', {color: 'white'});
			play.color = 'white';
		}

		play.getRandBlack = function() {
			socket.emit('client:getRandomCard', {color: 'black'});
			play.color= 'black';
		}
	}

})();
