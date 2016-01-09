var express = require('express');
var passport = require('passport');
var User = require('../../models/User');

exports.getSignup = function(req, res) {
  res.render('users/signup', {
    title: 'Signup',
    msg: 'Signup Page'
  });
};

exports.postSignup = function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email}), req.body.password, function(err, user) {
    if (err) {
        return res.render('users/signup', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
  });
};

exports.getLogin = function(req, res) {
  res.render('users/login', { user : req.user });
};

exports.postLogin = function(req, res, next) {
  console.log('login', req.body.email);

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { console.log('not a user'); return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);

};


