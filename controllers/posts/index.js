var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Post = require('../../models/Post');

exports.getPosts = function(req, res) {
  Post.find({}, function(err, posts){
    if (err) {
      return err;
    } else {
      res.format({
        html: function(){
          res.render('posts/index', {
            title: 'Posts',
            "posts" : posts
            });
          },
        json: function(){
          res.json(posts);
        }
      });
    }
  });
};

exports.showPost = function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post){
    if (err) {
      return err;
    } else {
      res.format({
        html: function(){
          res.render('posts/show', {
            "post" : post
            });
          },
        json: function(){
          res.json(post);
        }
      });
    }
  });
};

exports.createPost = function(req, res) {
  res.render('posts/create', {
    title: 'New Post'
  });
};

exports.newPost = function(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  Post.create({
    title: title,
    content: content
  }, function(err, post) {
    if (err) {
      return err;
    } else {
      res.format({
          html: function(){
              req.flash('success', { msg: 'Post Added!' });
              res.location("posts");
              res.redirect("/posts");
          },
          json: function(){
              res.json(post);
          }
      });
    }
  });
};

exports.updatePost = function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.title = req.body.title || '';
    post.content = req.body.content || '';
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Post Updated!' });
      res.redirect('/posts/' + post.id);
    });
  });

};


exports.deletePost = function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post){
    if (err) {
      return err;
    } else {
      post.remove(function(err, post){
        if (err) {
          return err;
        } else {
          res.format({
            html: function(){
                 req.flash('success', { msg: 'Post Deleted!' });
                 res.redirect("/posts");
            },
            json: function(){
            res.json({message : 'deleted',
              item : post
              });
            }
          });
        }
      });
    }

  });
};
