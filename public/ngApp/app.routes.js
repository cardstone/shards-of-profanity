(function () {
	'use strict';

	angular
		.module('app')
		.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

			// Set up the states
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'components/home/homeView.html',
					controller: 'HomeController',
					controllerAs: 'home'
				})
				.state('game', {
					url: '',
					templateUrl: 'components/game/gameView.html'
				})
				.state('game.components', {
					params: {myParam: null},
					views: {
						'chat': {
							templateUrl: 'components/chat/chatView.html',
							controller: 'ChatController',
							controllerAs: 'chat'
						}
					}
				});  
			$locationProvider.html5Mode(true);
		});
})();
