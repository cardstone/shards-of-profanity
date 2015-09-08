//angular.module('MainCtrl', []).controller('MainController', function ($scope) {
module.exports = function () {
	var main = this;
	// FIXME: updating this (and possibly other .js) files triggers a nodemon restart then loads forever and doesnt update front-end changes
	main.tagline = 'THESE GOSH diddly message was brought to you by the MainController';

};
