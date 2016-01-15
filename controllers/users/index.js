var express = require('express');
var crypto = require('crypto');
var passport = require('passport');
var User = require('../../models/User');

exports.getSignup = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('users/signup', {
    title: 'Signup'
  });
};


exports.postSignup = function(req, res) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

   if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  });

  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};


exports.getLogin = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('users/login', {
    title: 'Login'
  });
};

exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

exports.getProfile = function(req, res) {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('users/profile', {
    user: req.user
  });
};

exports.facebookLogin = passport.authenticate('facebook', {

});

// passport.authenticate('local', {
//   successRedirect: '/result',
//   failureRedirect: '/login'
// });

// function(req, res) {
//    console.log('worked');
//    passport.authenticate('facebook'),
//     function(req, res){
//       // The request will be redirected to Facebook for authentication, so this
//       // function will not be called.
//     };
// };

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

