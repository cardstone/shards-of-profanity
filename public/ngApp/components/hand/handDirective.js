(function() {
	'use strict';

	angular
		.module('app')
		.directive('hand', [hand]);

	function hand(){
		return {
			restrict: 'EA',
			templateUrl: 'components/hand/handView.html'
		};
	}
}());
