module.exports = function (socketio) {
	this.messages = [];
	messages = this.messages;

	socketio.on('server:message', function (msg) {
		messages.push(msg);
	});

	socketio.on('user:message', function (msg) {
		messages.push(msg);
	});

	this.sendMessage = function () {
		socketio.emit('user:message', this.msg);
		messages.push(this.msg);
		this.msg = '';
	};
};
