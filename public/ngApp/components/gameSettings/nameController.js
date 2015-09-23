(function () {
	'use strict';

	angular
		.module('app')
		.controller('NameController', ['$state', '$stateParams', NameController]);

	function NameController ($state, $stateParams) {
		var nameCtrl = this;
		var gameData = $stateParams.myParam;
		//$scope.mySocket = gameData.mySocket;
		//$scope.myGameId = gameData.myGameId;

		nameCtrl.myName = '';

		nameCtrl.enterName = function () {
	      	$state.go('game', { 
		        myParam: { 
					mySocket: gameData.mySocket, 
					myGameId: gameData.myGameId,
					myName: nameCtrl.myName
		        }
		    });
		};

	}
})();