module.exports = function (io) {
	'use strict';
	io.on('connection', function (socket) {
		socket.broadcast.emit('server:message', 'Server: a user connected.');

		socket.on('disconnect', function() {
      		socket.broadcast.emit('server:message', 'Server: a user disconnected.');
      	});

	  	socket.on('user:message', function (msg) {
	    	socket.broadcast.emit('user:message', msg);
		});
	});
};