/* jshint esnext:true, strict:true, node:true*/
"use strict";

const express    = require('express'),
	  app        = express(), 
	  bodyParser = require('body-parser'),
	  config	 = require('./config'),
	  db 		 = require('orchestrate')(config.orchestrate.token);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

const router = express.Router();

router.get("/", function(req, res){
	db.newEventBuilder()
		.from('hits', 'test')
		.type('hit')
		.time(Date.now())
		.data({test: "text"})
		.then(function (res) {
      		console.log(res.statusCode);
    	});

	const today 	= Date.now(),
	      yesterday = new Date(today - 24*60*60*1000 ).getTime();

	const hits 		= db.newEventReader()
						.from('hits', 'test')
						.start(yesterday)
						.end(today)
						.type('hits')
						.then(function(r){
							res.json({message: "welcome to the miscellanea", "today": today, "yesterday":yesterday, "results": r.body});
						})
						.fail(function(err){
							res.send(500, err);
						});	
	
});

//put everything off /api for now
app.use("/api", router); 

const port = process.env.PORT || 8888;
app.listen(port);
console.log("Grabbing groceries on " + port); 