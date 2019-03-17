const express = require('express');

const { register, login } = require('../controllers/auth');
const sessionChecker = require('../utils/sessionChecker');
const { dashboard } = require('../controllers/movies');


const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));
router.use('/login', login);
router.use('/register', register);
router.use('/movies', dashboard);

module.exports = router;
