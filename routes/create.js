var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;  //defines an object that has properties of our mongodb connection

var models = require("../models");

router.get('/', function(req, res) {
  res.render('index', {create: true, title: '- Create'}); //index.html that contains create block
});

router.post('/submit', function(req, res) { //we are in /create already!
  var title = req.body.pageTitle; //content in top input
  var body = req.body.pageContent;  //content in bottom input

  var generateUrlName = function(title) {
  	if(typeof title != "undefined" && title !== "") {
  		return title.replace(/[^0-9A-z]+/g, "_"); //this will replace everything that is NOT a number or letter with an _
  	} else {
  		return Math.random().toString(36).substring(2,7);
  	}
  };
 
  var url_name = generateUrlName(title);

  var p = new models.Page({ //Page here refers to index.js (models) line 30's key, which 
  	"title": title,         //refers to the pageSchema object
  	"body":body, 
  	"url_name": url_name
  });
  p.save();
  // res.redirect('/');  this line will take the user back one page (the line under will take the user back to the home page)
  res.redirect("/");  //will be redirected to home page when submit button is clicked
  db.emit("postAdded"); //this will say that "postAdded" event happened when submit is clicked
});

module.exports = router;





