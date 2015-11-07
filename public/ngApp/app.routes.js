(function () {
	'use strict';

	angular
		.module('app')
		.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', routes]);

	function routes($stateProvider, $locationProvider, $urlRouterProvider) {

		// Set up the states
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'components/home/homeView.html'
			})
			.state('joinGame', {
				url: '/join/:gameId',
				params: {host: null},
				controller: 'JoinGame',
				controllerAs: 'join'
			})
			.state('game', {
				url: '/game/:gameId',
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
					},
					'hand': {
						templateUrl: 'components/hand/handView.html',
						controller: 'handController',
						controllerAs: 'hand'
					},
					'play': {
						templateUrl: 'components/play/playView.html',
						controller: 'PlayController',
						controllerAs: 'play'
					}
					// 'timer': {
					// 	templateUrl: 'components/timer/timerView.html',
					// 	controller: 'timerController',
					// 	controllerAs: 'timer'
					// }
				}
			})
			.state('gameNotFound', {
				templateUrl: 'components/misc/gameNotFoundView.html'
			})
			.state('404NotFound', {
				url: '/notFound',
				templateUrl: 'components/misc/notFoundView.html'
			});
		$urlRouterProvider.otherwise('/notFound');
		$locationProvider.html5Mode(true);
	}
})();
