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

exports.getSingleMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    let averageRating = 0;

    const movie = await Movie
      .findById(movieId)
      .populate('comments');

    if (movie && movie.ratingsValue !== 0) {
      averageRating = Math.round(movie.ratingsValue / movie.ratingsCount);
    }

    return res.render('movieDetail', { movie, averageRating });
  } catch(err) {
    next(err);
  }
}

exports.commentMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { user: { _id: userId} } = req.session;
    console.log(req.session.user);
    const { movieComment } = req.body;

    const comment = await Comment.create({
      movieId,
      userId,
      comment: movieComment,
    });
    const movie = await Movie.findById(movieId);
    movie.comments.push(comment);
    await movie.save();

    return res.redirect(`/movie/${movieId}`);
  } catch(err) {
    next(err);
  }
}

exports.movieCategories = async (req, res) => {
  return res.render('categories');
}
