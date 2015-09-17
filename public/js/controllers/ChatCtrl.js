module.exports = function (socketio) {
	this.messages = [];
	messages = this.messages;

	// listen for messages
	socketio.on('send:message', function (msg) {
		messages.push(msg);
	});

	this.sendMessage = function () {
		socketio.emit('send:message', this.msg);

		this.messages.push(this.msg)

		this.msg = '';
	};

};