(function () {
	'use strict';

	angular
		.module('app')
		.directive('cardButton', [cardButton]);

	function cardButton() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'components/home/cardButtonTemplate.html',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: CardButtonController
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {

		}
	}

	CardButtonController.$inject = ['$scope', '$state', '$stateParams', 'SocketService'];

	function CardButtonController($scope, $state, $stateParams, SocketService) {
		$scope.expanded = false;
		$scope.toggle = function () {
			$scope.expanded = !$scope.expanded;
		};

	}
})();
