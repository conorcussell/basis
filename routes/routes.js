var express = require('express');
var router = express.Router();
var passport = require('passport');

var homeController = require('../controllers/home/index');
var userController = require('../controllers/users/index');

router.get('/', homeController.index);

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/profile', userController.getProfile);

router.get('/logout', userController.logout);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;
