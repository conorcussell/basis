var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var lusca = require('lusca');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');

var passportConf = require('./config/passport');

var routes = require('./routes/routes');

mongoose.connect('mongodb://localhost/basis');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'basis',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', routes);

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});

module.exports = app;
