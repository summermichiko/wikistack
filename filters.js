// Setting custom filters on Swig
var swig = require("swig");

 
module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page " + doc.url_name;
    }
    return "<a href='/wiki/" + doc.url_name + "'>" + link_name + "</a>";
  };
  page_link.safe = true;
 
  swig.setFilter('page_link', page_link); //using swig functionality in filters here

  var marked = require('marked');
  var markedFilter = function (body) {
    return marked(body);
  };
  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);
};



