require('angular');
require('angular-route');
require('angular-socket-io');

angular
  .module('app', [
    'ngRoute',
    'btford.socket-io',
  ]);

require('./app.routes');

require('./components/chat/ChatController');
require('./components/chat/ChatService');

// require('./directives');
// require('./services');
