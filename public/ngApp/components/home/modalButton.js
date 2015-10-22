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
			controller: CardButtonController,
			transclude: true
		};

		return directive;
	}

	CardButtonController.$inject = ['$scope', '$state', '$stateParams', 'SocketService'];

	function CardButtonController($scope, $state, $stateParams, SocketService) {
		$scope.expanded = false;
		$scope.toggle = function () {
			$scope.expanded = !$scope.expanded;
		};

	}
})();
