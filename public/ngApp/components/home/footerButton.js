(function () {
	'use strict';

	angular
		.module('app')
		.directive('footerButton', [footerButton]);

	function footerButton() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'components/home/footerButtonTemplate.html',
			replace: true,
			scope: {
				ctrl: '@ctrl'
			},
			controller: footerButtonController,
			transclude: true
		};

		return directive;
	}

	footerButtonController.$inject = ['$scope'];

	function footerButtonController($scope) {
		$scope.expanded = false;
		$scope.template = `components/home/${$scope.ctrl}View.html`;
	}
})();
