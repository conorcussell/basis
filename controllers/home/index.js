exports.index = function(req, res) {
  res.render('home', {
    title: 'Basis Home',
    msg: 'Hello World'
  });
};
