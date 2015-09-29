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

    // if we successfully joined, go to game state
    SocketService.on('server:joinSuccess', function (data) {
      var mySocket = SocketService;
      // pass our socket and unique gameId
      $state.go('joinGame', {gameId: data.gameId});
    });

    SocketService.on('server:createSuccess', function (data) {
      $state.go('joinGame', {gameId: data.gameId});
    });


    SocketService.on('server:joinFailure', function () {
      // to do.
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
      SocketService.emit('client:joinGame', {gameId: homeCtrl.gameToJoin});
      homeCtrl.gameToJoin = '';
    };

    homeCtrl.sendMessage = function () {
      SocketService.emit('client:sendMessage', {gameId: homeCtrl.gameId});
    };
  }
})();
