(function () {
	'use strict';

	angular
    .module('app')
    .directive('whiteCard', [whiteCard]);
  // this is the directive
	function whiteCard() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'shared/card/whiteCardTemplate.html',
			scope: {card: '=card'}
		};
		return directive;
	}
})();
