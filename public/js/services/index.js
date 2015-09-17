var app = require('angular').module('app');

app.factory('socketio', ['$rootScope', require('../services/SocketService')]);
