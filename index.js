const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');

// setup
require('./utils/db');
const loadMovies = require('./utils/loadMovies');
const routes = require('./routes');


dotenv.config();
loadMovies();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8080;
const sessionData = {
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionData));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie('user_sid');
//   }
//   next();
// });

app.use('/', routes)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
