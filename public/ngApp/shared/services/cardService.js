(function () {
	'use strict';

	angular
		.module('app')
		.factory('CardService', ['angoose.client', CardService]);

	function CardService(){
		var white = [];
		var black = [];
		// var poop = new ass;
		return {
			getWhite: function() {
				return white;
			},
			getBlack: function() {
				return black;
			}
		};
	}

})();
