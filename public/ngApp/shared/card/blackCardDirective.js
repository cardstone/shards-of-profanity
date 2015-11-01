(function () {
	'use strict';

	angular
    .module('app')
    .directive('blackCard', [blackCard]);
  // this is the directive
	function blackCard() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'shared/card/blackCardTemplate.html',
			scope: {card: '=card'}
		};
		return directive;
	}
})();
