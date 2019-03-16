const express = require('express');
const dotenv = require('dotenv');
session = require('express-session');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const sessionData = {
  secret: process.env.SESSION_SECRET,
  cookie: {}
};

app.use(session(sessionData));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
