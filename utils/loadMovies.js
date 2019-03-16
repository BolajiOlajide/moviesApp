const Movie = require('../models/Movie');
const moviesList = require('./movies.json');

module.exports = async () => {
  console.log('Checking database for movies...')
  const movies = await Movie.find({});
  if(movies.length === 0) {
    console.log('No movies found, loading movies to database...')
    const newMovies = await Movie.create(...moviesList);
    console.log('Good to go, movies loaded.')
  }else {
    console.log('Good to go, movies already loaded.')
  }
}
