exports.getSignup = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('users/signup', {
    title: 'Signup',
    msg: 'Signup Page'
  });
};
