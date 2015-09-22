(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['$state', '$stateParams', 'SocketService', HomeController]);

  function HomeController ($state, $stateParams , SocketService) {
    var homeCtrl = this;
    homeCtrl.gameToJoin = '';
    homeCtrl.games = [];
    homeCtrl.joinedSocket = null;

    // ask the server for the list of games
    SocketService.emit('client:getGames');

    // listen for events from server
    SocketService.on('server:message', function (data) {
      homeCtrl.message = data.msg;
    });

    SocketService.on('server:games', function (data) {
      homeCtrl.games = data.games;
    });

    SocketService.on('server:joinSuccess', function (data) {
      var mySocket = SocketService;
      $state.go('game', { 
        myParam: { 
          socket: mySocket, 
          gameId: data.gameId
        }
      });
    });

    SocketService.on('server:joinFailure', function () {

    });


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
