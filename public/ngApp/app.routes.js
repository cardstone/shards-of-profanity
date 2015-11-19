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
					'nav': {
						templateUrl: 'components/nav/navView.html'
					},
					'chat': {
						// template: '<div class="chat">chat</div>'
						templateUrl: 'components/chat/chatView.html',
						controller: 'ChatController',
						controllerAs: 'chat'
					},
					'play': {
						// template: '<div class="play">play</div>'
						templateUrl: 'components/play/playView.html',
						controller: 'PlayController',
						controllerAs: 'play'
					},
					'scoreboard': {
						// template: '<div class="scoreboard">scoreboard</div>'
						templateUrl: 'components/scoreboard/scoreboardView.html',
						controller: 'ScoreboardController',
						controllerAs: 'scoreboard'
					},
					'timer': {
						template: '<div class="timer">timer</div>'
						// templateUrl: 'components/timer/timerView.html',
						// controller: 'timerController',
						// controllerAs: 'timer'
					}
				}
			})
			.state('gameNotFound', {
				templateUrl: 'components/misc/gameNotFoundView.html'
			})
			.state('404NotFound', {
				url: '/notFound',
				templateUrl: 'components/misc/notFoundView.html'
			});
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	}
})();
