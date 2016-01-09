var express = require('express');
var app = express();

// Views //
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// Routes //
app.get('/', function(req, res) {
  res.render('home', {title: 'Basis Home', msg: 'Hello World!'});
});


// Server //
var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
