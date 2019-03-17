const User = require('../models/User');


exports.fetchProfile = async (req, res, next) => {
  const { user: { _id } } = req.session;
  if (req.method === 'GET') {
    let profile
    try {
      profile = await User.findById(_id)
        .populate({
          path: 'favorites',
          populate: {
            path: 'movie',
            model: 'Movie'
          }
        })
        .select('-password');
    } catch (error) {
      console.log(error.message)
    }

    return res.render('profile', { profile });
  }
  let profile;
  try {
    profile = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      select: '-password'
    }).populate({
      path: 'favorites',
      populate: {
        path: 'movie',
        model: 'Movie'
      }
    });
  } catch (error) {
    next();
  }

  return res.render('profile', { profile });
}
