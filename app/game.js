exports.initGame = function (io, socket) {
  var chat = require('./chat');
  var home = require('./home');

  chat.initChat(io, socket);
  home.initHome(io, socket);
};