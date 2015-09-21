(function () {
	'use strict';

	// Set up the states
	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '/views/home/home.html'
		})
		.state('chat', {
			url: "/chat",
			templateUrl: '/views/chat/chatView.html',
			controller: 'ChatController',
			controllerAs: 'chat'
		});
})();
