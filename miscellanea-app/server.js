/* jshint esnext:true, strict:true, node:true*/
"use strict";

const express    = require('express'),
	  app        = express(), 
	  bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

const router = express.Router();

router.get("/", function(req, res){
	res.json({message: "welcome to the miscellanea"});
});

//put everything of /api for now
app.use("/api", router); 

const port = process.env.PORT || 8888;
app.listen(port);
console.log("Grabbing groceries on " + port); 