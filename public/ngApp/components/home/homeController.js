(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['$state', '$stateParams', 'SocketService', HomeController]);

  function HomeController ($state, $stateParams , SocketService) {
    var homeCtrl = this;
    homeCtrl.gameToJoin = '';
    homeCtrl.games = [];

    // ask the server for the list of games
    SocketService.emit('client:getGames');

    // listen for events from server
    SocketService.on('server:games', function (data) {
      homeCtrl.games = data.games;
    });

    SocketService.on('server:createSuccess', function (data) {
      $state.go('joinGame', {gameId: data.gameId});
    });

    // controller functions
    homeCtrl.createNewGame = function () {
      SocketService.emit('client:createNewGame');
    };

    homeCtrl.refreshGames = function () {
      SocketService.emit('client:getGames');
    };

    homeCtrl.selectGame = function () {
      // to do?
    };

    homeCtrl.joinGame = function () {
      $state.go('joinGame', {gameId: homeCtrl.gameToJoin});
      homeCtrl.gameToJoin = '';
    };
  }
})();
