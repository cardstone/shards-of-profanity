// modules =================================================
var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('./config/db');
/*var db = mongoose.connect('./config/db', function(err){
	if(err){
		console.error('\x1b[31m','Could not connect to MongoDB');
		console.log(err);
	}
});*/

var port = process.env.PORT || 5000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

/**
 *  I DONT KNOW WHAT THIS DOES BUT IT MAKES THE PAGE WORK
 *  when it is commented out, the code in app/routes.js sends the index.html file for every request, and break the simulate
 *  so this code stops that, there might be a cleaner solution but whatever, it works for now
 */

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
	extended: true
})); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/dist')); // set the static files location /dist/img will be /img for users

app.post('/', function(req, res){ // function sends information to the root of our application
	console.log(req.body);
	res.json(req.body);		
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// socket.io ===============================================
// might want to separate this into another .js
io.on('connection', function(socket){
	//console.log('a user connected');

	socket.on('disconnect', function(){
	    //console.log('a user disconnected');
	});

	socket.on('chat message', function(msg){
    	//console.log('message: ' + msg);
  	});

  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
});

// start app ===============================================
server.listen(port);
//console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
