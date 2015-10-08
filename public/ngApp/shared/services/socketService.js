(function () {
  'use strict';

  angular
    .module('app')
      .factory('SocketService', function (socketFactory) {
        return socketFactory();
      });
  // angular
  //   .module('app')
  //   .factory('SocketService', ['$rootScope', SocketService]);

  // function SocketService($rootScope) {
  //   var socket = io.connect();
  //   return {
  //     on: function (eventName, callback) {
  //       socket.on(eventName, function () {
  //         var args = arguments;
  //         $rootScope.$apply(function () {
  //           callback.apply(socket, args);
  //         });
  //       });
  //     },
  //     emit: function (eventName, data, callback) {
  //       socket.emit(eventName, data, function () {
  //         var args = arguments;
  //         $rootScope.$apply(function () {
  //           if (callback) {
  //             callback.apply(socket, args);
  //           }
  //         });
  //       });
  //     }
  //   };
  // }
})();
