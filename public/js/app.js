require('angular');
require('angular-route');
//require('btford.socket-io');

var app = angular.module('app', [
  'ngRoute',
  //'btford.socket-io'
]);

require('./appRoutes');
require('./controllers');
require('./directives');
require('./services');
