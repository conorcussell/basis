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
        req.flash('error', 'Sorry, that username is taken.');
        res.render('users/signup', { user : user });
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
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log(err);
      req.flash('error', err);
      res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);

};

exports.getLogout = function(req, res) {
  req.logout();
  res.redirect('/');
};


