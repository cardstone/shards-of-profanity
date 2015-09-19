// Pull in angular source code
require('angular');
// Pull in external modules
require('angular-route'); //ngRoute

angular
  .module('app', [
    'ngRoute',
  ]);

// route file
require('./app.routes');

// components (by folder)
require('./components/chat/');

// directives by folder
require('./shared/card/');
//shared services (only one file for now, but possibly import whole folder in the future)
require('./shared/services/SocketService');
