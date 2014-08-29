var express = require('express');
var router = express.Router();
var models = require("../models"); //really ("../models/index")

router.get('/', function(req, res) {
  models.Page.find({}, function(err, pages) {
    res.render('index', {docs: pages, browse: true, title: '- Home'});  //index.html
  });
});

module.exports = router;
