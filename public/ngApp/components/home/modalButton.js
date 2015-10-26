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
			scope: {},
			controller: modalButtonController,
			transclude: {
				modalButtonTitle: '?title',
				modalButtonContent: 'content'
			}
		};

		return directive;
	}

	modalButtonController.$inject = ['$scope'];

	function modalButtonController($scope) {
		$scope.expanded = false;
		$scope.class = 'createGame';
		$scope.template = `components/home/${$scope.class}View.html`;
	}
})();
