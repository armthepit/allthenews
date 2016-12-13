
// Required NPM Packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose');

// Mongoose Connect
var db = 'mongodb://localhost/goodnewsdb';
mongoose.connect(db, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('mongoose connection is sucessful');
  }
});

// Public Settings
app.use(express.static(__dirname + '/public'));
var port = 3000;

// Set up Handlebar for views
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Settings
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

//Routes
var routes = require('./controllers/news.js');
app.use('/',routes);

//Port
app.listen(port, function() {
    console.log("lisenting on port:" + port);
// });