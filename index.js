var express = require('express');
var app = express();

//====== Views ======//
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static('public'));

//====== Controllers ======//

var homeController = require('./controllers/home/index');
var userController = require('./controllers/users/index');


//====== Routes ======//

//Home
app.get('/', homeController.index);


//Users
app.get('/signup', userController.getSignup);



//====== Server ======//
var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
