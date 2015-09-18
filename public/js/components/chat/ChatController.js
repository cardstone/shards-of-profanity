angular
	.module('app')
	.controller('ChatController', ['SocketService', ChatController]);

function ChatController(SocketService) {
	// map this to a variable to avoid scoping issues
	//_?_ = this;

	this.messages = [];
	messages = this.messages;

	SocketService.on('server:message', function (msg) {
		messages.push(msg);
	});

	SocketService.on('user:message', function (msg) {
		messages.push(msg);
	});

	this.sendMessage = function () {
		SocketService.emit('user:message', this.msg);
		this.messages.push(this.msg);
		this.msg = '';
	};
}
