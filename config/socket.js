// socket server
module.exports = function (io) {
	'use strict';
	io.on('connection', function (socket) {
		socket.broadcast.emit('server:message', 'Server: a user connected.');

		socket.on('disconnect', function() {
      		socket.broadcast.emit('server:message', 'Server: a user disconnected.');
      	});

		//  listen for message events from clients
	  	socket.on('user:message', function (msg) {
	  		// forward that message to all clients,
	  		// except the origional sender
	    	socket.broadcast.emit('user:message', msg);
		});
	});
};