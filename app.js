var express = require('express');
var path = require('path');
var logger = require('morgan');
var Stat = require("./models/stat");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var checkAuth = require("./middleware/auth");
var jwtConfig = require("./jwtConfig");
const dbUrl = "mongodb://localhost:27017/stats";


var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

mongoose.connect(dbUrl).then((err, db) => {
  if (err) {
    console.log("ERROR", err);
  }
  console.log("Connected to the DB");
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', checkAuth, index);
app.use('/api', checkAuth, api);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


app.listen(4000, function() {
  console.log("Express running on 4000.");
});


module.exports = app;
