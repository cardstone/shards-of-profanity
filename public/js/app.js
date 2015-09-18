require('angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']);

require('./appRoutes');
require('./controllers');
require('./directives');
require('./services');
