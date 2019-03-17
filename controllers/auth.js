const User = require('../models/User');


exports.register = async  (req, res) => {
  if (req.method === 'GET') {
    return res.render('register');
  }
  const { fullname, email, password } = req.body;
  try {
    const user = await User.create({ fullname, email, password });
    req.session.user = user;
    return res.redirect('/movies');
  } catch(err) {
    return res.redirect('/register');
  }
}

exports.login = async (req, res) => {
  if (req.method === 'GET') {
    return res.render('index', { errorMessage: '' });
  }
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
  } catch (error) {
    return res.redirect('/login');
  }
  req.session.user = user;
  return res.redirect('/movies');
}
