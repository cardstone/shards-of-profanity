angular
	.module('app')
	.config(function ($stateProvider, $urlRouterProvider) {
		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise('/');

		// Set up the states
		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'home.html'
			})
			.state('chat', {
				url: "/chat",
				templateUrl: 'chatView.html',
				controller: 'ChatController',
				controllerAs: 'chat'
			});
	});
