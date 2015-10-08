(function () {
  'use strict';

  angular
    .module('app')
      .factory('SocketService', function (socketFactory) {
        return socketFactory();
      });
})();
