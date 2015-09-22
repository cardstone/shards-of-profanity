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
					templateUrl: 'components/game/gameView.html',
					params: {myParam: null},
					controller: 'GameController',
					controllerAs: 'game'
				});
			$locationProvider.html5Mode(true);
		});
})();
