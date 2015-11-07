(function () {
	'use strict';

	angular
    .module('app')
    .directive('cardGroup', [cardGroup]);


	function cardGroup() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'shared/card/cardGroupTemplate.html',
			scope: {cards: '=cards'}
		};

		return directive;
	}

})();
