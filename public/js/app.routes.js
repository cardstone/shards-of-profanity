require('angular');
require('angular-route');

module.exports = angular.module('appRoutes', [])
	// $routeProvider and $locationProvider are built-in services being passed into the callback function
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'MainController',
				controllerAs: 'main'
			})
			// .when('/about', {
			// 	templateUrl: 'views/about.html',
			// 	controller: 'AboutController'
			// })
		;

		$locationProvider.html5Mode(true);

	}]);
