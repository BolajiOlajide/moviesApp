const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
  console.log('Database connected succesfully');
});

mongoose.connection.on('disconnected', () =>{
  console.log('Database disconnected');
});

mongoose.connection.on('error', (errorMessage) =>{
  console.error(errorMessage);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Database connection closed succesfully');
  });
});

module.exports = mongoose.connection;
