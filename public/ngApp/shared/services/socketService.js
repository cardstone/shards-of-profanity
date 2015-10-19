(function () {
	'use strict';

	angular
    .module('app')
      .factory('SocketService', [SocketService]);

	function SocketService (socketFactory) {
		return socketFactory();
	}
})();
