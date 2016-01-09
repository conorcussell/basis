exports.getSignup = function(req, res) {
  res.render('users/signup', {
    title: 'Signup',
    msg: 'Signup Page'
  });
};

exports.postSignup = function(req, res) {

};
