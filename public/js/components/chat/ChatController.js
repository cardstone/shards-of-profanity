angular
	.module('app')
	.controller('ChatController', [ChatController]);
ChatController.$inject = ['ChatService'];

function ChatController(ChatService) {
	// map this to a variable to avoid scoping issues
	//_?_ = this;

	console.log(ChatService);
	this.messages = [];
	// messages = this.messages;

	ChatService.on('server:message', function (msg) {
		this.messages.push(msg);
	});

	ChatService.on('user:message', function (msg) {
		this.messages.push(msg);
	});

	this.sendMessage = function () {
		ChatService.emit('user:message', this.msg);
		this.messages.push(this.msg);
		this.msg = '';
	};
}
