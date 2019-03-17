const express = require('express');

const { register, login } = require('../controllers/auth');
const sessionChecker = require('../utils/sessionChecker');
const { dashboard, getSingleMovie, commentMovie } = require('../controllers/movies');
const { fetchProfile } = require('../controllers/profile');


const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));
router.use('/login', login);
router.use('/register', register);
router.use('/movies', sessionChecker, dashboard);
router.use('/movie/:movieId', sessionChecker, getSingleMovie);
router.post('/movie/:movieId/comment', sessionChecker, commentMovie);
router.use('/profile', sessionChecker, fetchProfile);

module.exports = router;
