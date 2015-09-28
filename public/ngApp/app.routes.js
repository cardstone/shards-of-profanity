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
				.state('enterName', {
					url: 'entername',
					params: {myParam: null},
					templateUrl: 'components/gameSettings/nameView.html',
					controller: 'NameController',
					controllerAs: 'name'
				})
				.state('game', {
					url: 'game',
					params: {myParam: null},
					templateUrl: 'components/game/gameView.html',
					controller: 'GameController',
					controllerAs: 'game'
				})
				.state('game.components', {
					views: {
						'chat': {
							templateUrl: 'components/chat/chatView.html',
							controller: 'ChatController',
							controllerAs: 'chat'
						},
						'scoreboard': {
							templateUrl: 'components/scoreboard/scoreboardView.html',
							controller: 'ScoreboardController',
							controllerAs: 'scoreboard'
						}
					}
				});
			$locationProvider.html5Mode(true);
		});
})();
