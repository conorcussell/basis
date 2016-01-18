var should = require("should");
var mongoose = require('mongoose');
var Post = require('../../models/Post');
var db;

describe('Post', function() {

before(function(done) {
 db = mongoose.connect('mongodb://localhost/basis');
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var post = new Post({
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet'
  });


  post.save(function(error) {
      if (error) console.log('error' + error.message);
      else console.log('no error');
      done();
    });
  });


  it('return a post', function(done) {
    Post.findOne({ title: "Title"}, function(err, post) {
      post.title.should.eql('Title');
      console.log("   title: ", post.title)
      done();
    });
  });

 afterEach(function(done) {
    Post.remove({}, function() {
      done();
    });
 });

});
