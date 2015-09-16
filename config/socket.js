module.exports = function (io) {
	'use strict';
	io.on('connection', function(socket){
		socket.broadcast.emit('a user connected');

		socket.on('disconnect', function(){
		    socket.broadcast.emit('a user disconnected');
		});

	  	socket.on('chat message', function(msg){
	    	io.sockets.emit('chat message', msg);
		});
	});
};