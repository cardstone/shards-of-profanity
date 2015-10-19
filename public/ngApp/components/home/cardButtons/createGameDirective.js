// (function() {
// 	'use strict';
//
// 	angular
// 		.module('app')
// 		.directive('createGame', [createGame]);
//
// 	function createGame() {
// 		var directive = {
// 			restrict: 'EA',
// 			templateUrl: 'components/home/cardButtons/createGameView.html',
// 			scope: {
// 			},
// 			link: linkFunc,
// 			controller: CreateGameController,
// 			controllerAs: 'vm',
// 			bindToController: true
// 		};
//
// 		return directive;
//
// 	    function linkFunc(scope, el, attr, ctrl) {
//
// 	    }
// 	}
//
// 	CreateGameController.$inject = ['$state', '$stateParams', 'SocketService', ];
//
// 	function CreateGameController($state, $stateParams, SocketService) {
// 	    var vm = this;
// 	    vm.faceUp = false;
//
// 	    SocketService.on('server:createSuccess', function (data) {
// 	      $state.go('joinGame', {gameId: data.gameId});
// 	    });
//
// 	    vm.expand = function() {
// 	      vm.faceUp = true;
// 	    };
//
// 	    vm.createNewGame = function () {
// 	      SocketService.emit('client:createNewGame');
// 	    };
//
// 	    activate();
//
// 	    function activate() {
//
// 	    }
// }
// })();
