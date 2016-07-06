var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var mongojs = require('mongojs')

//Create parser for application/x-www-form-urlencoded
var urlEncodedParser = bodyParser.urlencoded({extended:false})

app.use('/images', express.static(__dirname + '/images'));

//Get the page
app.get('/captcha_registration.html', function(req, res) {
	res.sendFile(__dirname + "/" + "captcha_registration.html");
})

//Post the data to server
app.post('/Save', urlEncodedParser, function(req, res) {
	// Prepare output in JSON format
	response = {
		uid:req.body.uid,
		pwd:req.body.pwd,
		email:req.body.email,
		phone:req.body.phone,
		sq1:req.body.sq1,
		sa1:req.body.sa1,
		sq2:req.body.sq2,
		sa2:req.body.sa2,
		addr:req.body.addr,
		interest:req.body.interest,
	};
	console.log("Hi ", req.body.uid);
	res.end(JSON.stringify(response));

	 
	var databaseUrl = "cmpe280hw";
	var collections = ["userreg"]
	var db = mongojs(databaseUrl, collections);

	db.userreg.save({uid: response.uid,
		pwd: response.pwd,
		email: response.email,
		phone: response.phone,
		sq1: response.sq1,
		sa1: response.sa1,
		sq2: response.sq2,
		sa2: response.sa2,
		addr: response.addr,
		interest: response.interest,
	}, function(err, saved) {
			if(!saved || err) {
				console.log("User details not saved!");
			}
			else {
				console.log("User details saved!")
			}
		});	
})

var server = app.listen(3001, function() {
	var port = server.address().port
	console.log("User Registration App listening at %s", port);
});