(function () {
	'use strict';

	angular
    .module('app')
      .factory('SocketService', ['socketFactory', SocketService]);

	function SocketService (socketFactory) {
		return socketFactory();
	}
})();
