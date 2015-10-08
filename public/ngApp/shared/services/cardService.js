(function () {
	'use strict';

	angular
		.module('app')
		.factory('CardService', [CardService]);

	function CardService(){
		var white = []
		var black = [] 

		return {
			getWhite: function() {
				return white;
			}
			,
			getBlack: function() {
				return black;
			}
		};
	}

})();