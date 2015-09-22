(function () {
	'use strict';

	angular
		.module('app')
		.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
			// set up the states
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'components/home/homeView.html',
					controller: 'HomeController',
					controllerAs: 'home'
				})
				.state('game', {
					url: '',
					templateUrl: 'components/game/gameView.html',
					params: {myParam: null},
					controller: 'GameController',
					controllerAs: 'game'
				});

			// enable pretty urls with no // 
			$locationProvider.html5Mode(true);
		});
})();
