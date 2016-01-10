var should = require("should");
var mongoose = require('mongoose');
var User = require('../../models/User');
var db;

describe('User', function() {

before(function(done) {
 db = mongoose.connect('mongodb://localhost/basis');
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var user = new User({
    email: 'email@example.com',
    password: 'testy'
  });

  user.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 it('find a user by username', function(done) {
    User.findOne({ email: 'email@example.com' }, function(err, user) {
      user.email.should.eql('email@example.com');
      console.log("   email: ", user.email)
      done();
    });
 });

 afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
 });

});
