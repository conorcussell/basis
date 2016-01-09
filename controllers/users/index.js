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
        return res.render('signup', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
  });
};

exports.getLogin = function(req, res) {
  res.render('login', { user : req.user });
};

exports.postLogin = function(req, res) {
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  };
};
