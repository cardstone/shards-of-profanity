(function () {
	'use strict';

	angular
		.module('app')
		.config(function ($stateProvider, $urlRouterProvider) {

			// Set up the states
			$stateProvider
				.state('/', {
					url: '/',
					templateUrl: 'components/home/homeView.html',
					controller: 'HomeController',
					controllerAs: 'home'
				})
				.state('chat', {
					url: "/chat",
					templateUrl: 'components/chat/chatView.html',
					controller: 'ChatController',
					controllerAs: 'chat'
				});
		});
})();
