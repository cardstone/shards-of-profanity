(function () {
	'use strict';

	angular
		.module('app')
		.controller('EnterNameController', ['$scope', EnterNameController]);

	function EnterNameController ($scope) {
		var enterNameCtrl = this;
		var socket = $scope.mySocket;

		enterNameCtrl.tagline ='enter name ctrl';
		enterNameCtrl.myName = '';
		enterNameCtrl.show = true;

		enterNameCtrl.turnOffThisView = function () {
			enterNameCtrl.show = false;
		}

		enterNameCtrl.enter = function () {
			console.log('enter');
			socket.emit('client:enterName', {playerName: enterNameCtrl.myName});
			enterNameCtrl.turnOffThisView();
		}
	}
	
})();