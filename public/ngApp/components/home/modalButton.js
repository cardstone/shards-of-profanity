(function () {
	'use strict';

	angular
		.module('app')
		.directive('modalButton', [modalButton]);

	function modalButton() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'components/home/modalButtonTemplate.html',
			replace: true,
			scope: {
				ctrl: '@ctrl'
			},
			controller: modalButtonController,
			transclude: true
		};

		return directive;
	}

	modalButtonController.$inject = ['$scope'];

	function modalButtonController($scope) {
		$scope.expanded = false;
		$scope.template = `components/home/${$scope.ctrl}View.html`;
	}
})();
