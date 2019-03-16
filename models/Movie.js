const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  category: [{
    type: String,
    required: true,
  }],
  ratingsCount: {
    type: Number,
    default: 0,
  },
  ratingsValue: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


const Movie = mongoose.model('Movie', schema);

module.exports = Movie;
