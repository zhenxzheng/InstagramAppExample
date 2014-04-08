//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path'); //add this in the top dependencies
var handlebars = require('express3-handlebars');
var app = express();
//route for hashtag
var hashtag = require('./routes/hashtag'); //add this in the top dependencies
var index = require('./routes/index'); //add this to beginning of app.js
//database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/instagramexample');

//load environment variables
var dotenv = require('dotenv');
dotenv.load();

//add instagram api setup
var ig = require('instagram-node-lib');
ig.set('client_id', process.env.instagram_client_id);
ig.set('client_secret', process.env.instagram_client_secret);

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public'))); //add this after app obj.
app.use(express.bodyParser()); //add this right before routes

//routes
app.get('/', index.view); //change this route
app.get('/hashtag', function (req, res) {
	res.render('hashtag');
})
app.post('/hashtag', hashtag.getHashtag); //add this with routes
app.post('/save', hashtag.saveFavorites);
app.post('/delete', index.deleteImage);
//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

ig.tags.info({
	name:'sushi',
	complete: function(data){
		console.log(data);
	}
});