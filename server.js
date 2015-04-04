//GRAB 
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var keys = require('./keys');// Keys module contains client_id, client_secret. 
var c_id = keys.client_id;
var c_secret = keys.client_secret;

//CONFIGURE THE APP
var __dirname = '.';

//tell the node where to look for resources
app.use(express.static(__dirname+'/public'));

app.set('view engine','ejs');

//configure instagram app with client-id
ig.use({
	client_id:c_id,
	client_secret:c_secret
})


//SET THE ROUTES
//home page route
app.get('/',function(request,response){

	//user the instagram packege to get popular media
	ig.media_popular(function(err,medias,remaining,limit){
		//render the home page and pass in the popular images
		response.render('pages/index',{grams:medias});
	});
	
});

//START THE SERVER
app.listen(8080);
console.log("App started! Look at http://localhost:8080");