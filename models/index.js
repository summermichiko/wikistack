var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');  //connects us to MongoDB
var db = mongoose.connection;  //when successfully connected (db = object that contains properties about our connection to MongoDB)
db.on('error', console.error.bind(console, 'mongodb connection error:'));  //defines error response

var Page, User;
var Schema = mongoose.Schema;
 
var pageSchema = new Schema({
  name:  String,
  title: String,
  url_name: String,
  owner_id:   String,
  body:   String,
  date: { type: Date, default: Date.now },
  status: Number
});
 
var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});
 
Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);
 
module.exports = {"Page": Page, "User": User};