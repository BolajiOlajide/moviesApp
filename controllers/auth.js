const User = require('../models/User');


exports.register = (req, res) => {
  if (req.method === 'GET') {
    return res.render('register');
  }
}

exports.login = async (req, res) => {
  console.log(req.session);
  if (req.method === 'GET') {
    return res.render('index', { errorMessage: '' });
  }
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
  } catch (error) {
    return res.redirect('/login', { errorMessage: 'email or password incorrect' });
  }
  req.session.user = user;
  console.log(email, password, req);
}
