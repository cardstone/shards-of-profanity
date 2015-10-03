// modules =================================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var game = require('./app/game');

// load db
// var db = mongoose.connect(require('./config/db'));

// Set port
var port = process.env.PORT || 8080; // set our port

/**
 *  I DONT KNOW WHAT THIS DOES BUT IT MAKES THE PAGE WORK
 *  when it is commented out, the code in app/routes.js sends the index.html file for every request, and break the simulate
 *  so this code stops that, there might be a cleaner solution but whatever, it works for now
 */
//get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
	extended: true
})); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/dist')); // set the static files location /dist/img will be /img for users

app.post('/', function (req, res) { // function sends information to the root of our application
	console.log(req.body);
	res.json(req.body);
});

// socket.io ===============================================
var games = {}; // not being used, yet.
var socketsInfo = {};
io.sockets.on('connection', function (socket) {
	game.initGame(io, socket, games, socketsInfo); // pass sockets and games object to our game
});

// start app ===============================================
server.listen(port);
//console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
