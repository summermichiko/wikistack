var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/:pageTitle', function(req, res) {
	models.Page.findOne({url_name: req.params.pageTitle}, function(err, doc) {
		res.render('show', {doc: doc, title: '- Show'});  //rendering show.html
	}); 
});

router.get('/delete/:pageTitle', function(req, res) {
	models.Page.findOne({url_name: req.params.pageTitle}, function(err, doc) {
		models.Page.remove({url_name: req.params.pageTitle}, function(err, msg) {
			console.log(msg.toString() + "- Deleted"); //console.log on the server
		})
		res.redirect("/");
	}); 
});


router.get('/edit/:pageTitle', function(req, res) {
	models.Page.findOne({url_name: req.params.pageTitle}, function(err, doc) {
		res.render('show', {edit: true, doc: doc, title: '- Show'});
	}); 
});

router.post('/edit/:pageTitle/submit', function(req, res) {
	var body = req.body.pageContent;
	models.Page.findOne({url_name: req.params.pageTitle}, function(err, doc) {
		models.Page.update({body: body}, function(err) {
			console.log(req.params.pageTitle + " - Edited");
		});
		res.redirect("/");
	}); 
});

module.exports = router;



