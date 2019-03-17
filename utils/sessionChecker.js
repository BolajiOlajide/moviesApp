// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    console.log(req);
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/movies');
    } else {
        next();
        // return res.redirect('/login');
    }
};

module.exports = sessionChecker;
