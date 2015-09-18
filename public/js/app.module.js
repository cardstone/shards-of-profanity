// Pull in angular source code
require('angular');
// Pull in external modules
require('angular-route'); //ngRoute
require('angular-socket-io'); //btford.socket-io

angular
  .module('app', [
    'ngRoute',
    'btford.socket-io',
  ]);

// route file
require('./app.routes');

// components (by folder)
require('./components/chat/');

// shared services (only one file for now, but possibly import whole folder in the future)
require('./shared/services/SocketService');
