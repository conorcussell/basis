var express = require('express');
var app = express();
var path = require('path');
var lusca = require('lusca');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//====== Views ======//
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'basis',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(lusca({
    csrf: true,
    csp: { /* ... */},
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true
}));

app.use(express.static('public'));

//====== Controllers ======//

var homeController = require('./controllers/home/index');
var userController = require('./controllers/users/index');


//====== Routes ======//

//Home
app.get('/', homeController.index);


//Users
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);

// passport config
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/basis');


//====== Server ======//
var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});

module.exports = app;
