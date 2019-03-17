const express = require('express');

const { register, login } = require('../controllers/auth');


const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));
router.use('/login', login);
router.use('/register', register);

module.exports = router;
