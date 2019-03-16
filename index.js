const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');

// setup
require('./utils/db');
const loadMovies = require('./utils/loadMovies');


dotenv.config();
loadMovies();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8080;
const sessionData = {
  secret: process.env.SESSION_SECRET,
};

app.use(session(sessionData));
app.use(bodyParser.json());
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
