(function() {
    'use strict';

    angular
        .module('app')
        .directive('joinGame', joinGame);

    function joinGame() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/home/cardButtons/joinGameView.html',
            scope: {
            },
            link: linkFunc,
            controller: JoinGameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    JoinGameController.$inject = ['$state', '$stateParams', 'SocketService'];

    function JoinGameController($state, $stateParams, SocketService) {
      var vm = this;
      vm.gameToJoin = '';
      vm.games = [];
      vm.faceUp = false;

      // ask the server for the list of games
      SocketService.emit('client:getGames');

      // listen for events from server
      SocketService.on('server:games', function (data) {
        vm.games = data.games;
      });


      vm.refreshGames = function () {
        SocketService.emit('client:getGames');
      };

      vm.selectGame = function () {
        // to do?
      };

      vm.joinGame = function () {
        $state.go('joinGame', {gameId: vm.gameToJoin});
        vm.gameToJoin = '';
      };



      vm.expand = function() {
        vm.faceUp = true;
      };


      activate();

      function activate() {

      }
    }
})();
