var app = require('angular').module('app');

app.controller('MainController', require('./MainCtrl'));
app.controller('ChatController', ['socketio', require('./ChatCtrl')]);
