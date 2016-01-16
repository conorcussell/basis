var express = require('express');
var router = express.Router();
var passport = require('passport');

var homeController = require('../controllers/home/index');
var userController = require('../controllers/users/index');
var postController = require('../controllers/posts/index');

router.get('/', homeController.index);

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/profile', userController.getProfile);

router.get('/posts/', postController.getPosts);
router.get('/posts/:id', postController.showPost);


router.get('/create', postController.createPost);


router.post('/create', postController.newPost);

router.post('/posts/:id', postController.updatePost);
router.post('/posts/delete/:id', postController.deletePost);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
