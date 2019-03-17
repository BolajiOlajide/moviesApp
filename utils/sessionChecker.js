// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.sessionID) {
        next();
        return;
    }
    return res.redirect('/login');
};

module.exports = sessionChecker;
