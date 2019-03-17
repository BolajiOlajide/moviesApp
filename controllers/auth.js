exports.register = (req, res) => {
  if (req.method === 'GET') {
    return res.render('register');
  }
}

exports.login = (req, res) => {
  if (req.method === 'GET') {
    return res.render('index');
  }
  return res.render('index');
}
