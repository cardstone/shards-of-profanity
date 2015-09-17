module.exports = function (io) {
	'use strict';
	io.on('connection', function (socket) {
		socket.broadcast.emit('send:message', 'Server: a user connected.');

	  	socket.on('send:message', function (msg) {
	    	socket.broadcast.emit('send:message', msg);
		});
	});
};