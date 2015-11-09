(function() {
	'use strict';

	angular
		.module('app')
		.directive('timer', [timer]);

	function timer() {
		return{
			restrict: 'EA',
			templateUrl: 'components/timer/timerView.html'
		};
	}
}());
