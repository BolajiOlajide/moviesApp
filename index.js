const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

// setup
require('./utils/db');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const sessionData = {
  secret: process.env.SESSION_SECRET,
};

app.use(session(sessionData));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
