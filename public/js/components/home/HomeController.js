(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['SocketService', HomeController]);

  function HomeController (SocketService) {
    var homeCtrl = this;
    homeCtrl.message = 'NONE';
    homeCtrl.gameId = '-1';
    homeCtrl.games = [];


    // listen for events from server
    SocketService.on('server:message', function (data) {
      homeCtrl.message = data.msg;
    });

    SocketService.on('server:newGameCreated', function (data) {
      //homeCtrl.gameId = data.gameId;
    });

    SocketService.on('server:games', function (data) {
      homeCtrl.games = data.games;
    });


    homeCtrl.createNewGame = function () {
      SocketService.emit('client:createNewGame');
      homeCtrl.refreshGames();
    };

    homeCtrl.refreshGames = function () {
      SocketService.emit('client:getGames');
    };

    homeCtrl.selectGame = function () {
      // to do?
    };

    homeCtrl.joinGame = function () {
      SocketService.emit('client:joinGame', {gameId: homeCtrl.gameToJoin});
      homeCtrl.gameId = homeCtrl.gameToJoin;
      homeCtrl.gameToJoin = '';
    };

    homeCtrl.sendMessage = function () {
      SocketService.emit('client:sendMessage', {gameId: homeCtrl.gameId});
    };


  }
})();
