(function () {
	'use strict';

	angular
		.module('app')
		.config(function ($stateProvider, $urlRouterProvider) {

			// Set up the states
			$stateProvider
				.state('/', {
					url: '/',
					templateUrl: 'homeView.html'
				})
				.state('chat', {
					url: "/chat",
					templateUrl: 'chatView.html',
					controller: 'ChatController',
					controllerAs: 'chat'
				});
		});
})();
