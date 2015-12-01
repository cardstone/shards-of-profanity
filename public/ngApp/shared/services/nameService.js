(function () {
	'use strict';

	angular
    .module('app')
    .factory('NameService', [NameService]);

	function NameService() {

		var adjectives = [
			//'anonymous',
			'random',
			//'mysterious',
			'vulgar',
			'vile',
			'weak',
			//'pathetic',
			//'milquetoast',
			'rusty',
			'poopy',
			'crusty',
			'musty',
			'dusty',
			'filthy',
			'smelly'
			//'butt-faced'
		];

		var nouns = [
			//'shit-bag',
			'plumbus',
			//'jerk-off',
			//'butthole',
			'fart',
			'casual',
			'plebian',
			'scum'
		];

		return {
			get: function() {
				var randomAdj = Math.floor(Math.random() * adjectives.length);
				var randomNouns = Math.floor(Math.random() * nouns.length);
				return adjectives[randomAdj] + ' ' + nouns[randomNouns];
			}
		};
	}


})();
