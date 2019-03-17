const Movie = require('../models/Movie');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Rating = require('../models/Rating');
const Favorite = require('../models/Favorite');


exports.dashboard = async (req, res, next) => {
  try {
    let { category, sortBy } = req.query;

    if (category) {
      const query = {
        category: {
          $regex: new RegExp(category, 'i'),
        },
      };
      let movies;

      if (sortBy) {
        // get movies and sort by releaseDate, name or ratingsValue
        movies = await Movie.find(query)
          .sort({ [sortBy]: 'asc' });
      } else {
        // get movies by category
        movies = await Movie.find(query);
      }

      return res.send({
        movies,
        message: 'success'
      });
    }

    // get all movies
    const movies = await Movie.find({});
    return res.render('dashboard', { movies });
  } catch (err) {
    next(err);
  }
}
