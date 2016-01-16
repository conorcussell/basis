var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConf = require('../config/passport');

var homeController = require('../controllers/home/index');
var userController = require('../controllers/users/index');
var postController = require('../controllers/posts/index');

router.get('/', homeController.index);

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/profile', passportConf.isAuthenticated, userController.getProfile);

router.get('/posts/', postController.getPosts);
router.get('/posts/:id', postController.showPost);


router.get('/create', passportConf.isAuthenticated, postController.createPost);
router.post('/create', passportConf.isAuthenticated, postController.newPost);
router.post('/posts/:id', passportConf.isAuthenticated, postController.updatePost);
router.put('/posts/update/:id', passportConf.isAuthenticated, postController.updatePost);
router.delete('/posts/delete/:id', passportConf.isAuthenticated, postController.deletePost);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
