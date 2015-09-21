(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['SocketService', HomeController]);

  function HomeController (SocketService) {
    var homeCtrl = this;
    homeCtrl.message = 'NONE';
    homeCtrl.gameId = 0;

    SocketService.on('server:message', function (data) {
      homeCtrl.message = data.msg;
    });

    SocketService.on('server:newGameCreated', function (data) {
      homeCtrl.gameId = data.gameId;
    });

    homeCtrl.createNewGame = function ()
    {
      SocketService.emit('client:createNewGame');
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
