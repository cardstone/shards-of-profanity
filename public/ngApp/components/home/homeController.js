(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['$state', '$stateParams', 'SocketService', HomeController]);

  function HomeController ($state, $stateParams , SocketService) {
    var home = this;
    home.gameToJoin = '';
    home.games = [];

    // ask the server for the list of games
    SocketService.emit('client:getGames');

    // listen for events from server
    SocketService.on('server:games', function (data) {
      home.games = data.games;
    });

    SocketService.on('server:createSuccess', function (data) {
      $state.go('joinGame', {gameId: data.gameId});
    });

    // controller functions
    home.createNewGame = function () {
      SocketService.emit('client:createNewGame');
    };

    home.refreshGames = function () {
      SocketService.emit('client:getGames');
    };

    home.selectGame = function () {
      // to do?
    };

    home.joinGame = function () {
      $state.go('joinGame', {gameId: home.gameToJoin});
      home.gameToJoin = '';
    };
  }
})();
