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
						templateUrl: 'components/chat/chatView.html',
						controller: 'ChatController',
						controllerAs: 'chat'
					},
					'play': {
						templateUrl: 'components/play/playView.html',
						controller: 'PlayController',
						controllerAs: 'play'
					},
					'scoreboard': {
						templateUrl: 'components/scoreboard/scoreboardView.html',
						controller: 'ScoreboardController',
						controllerAs: 'scoreboard'
					},
					'timer': {
						templateUrl: 'components/timer/timerView.html',
						controller: 'TimerController',
						controllerAs: 'timer'
					},
					'enterName':{
						templateUrl: 'components/gameSettings/enterNameView.html',
						controller: 'EnterNameController',
						controllerAs: 'enterName'
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
