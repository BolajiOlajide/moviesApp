const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

const validateFullname = (fullname) => {
  return fullname.trim().includes(" ");
}

const Schema = mongoose.Schema;

const schema = new Schema({
  fullname: {
    type: String,
    required: true,
    validate: [validateFullname, 'The provided fullname is not valid']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'The provided email address is not valid']
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]
});

schema.pre('save', async function (next){
  const user = this;
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash;
  return next();
});

schema.statics.authenticate = async function(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    const err = new Error('Wrong email or password');
    err.statusCode = 401;
    return Promise.reject(err)
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (isCorrectPassword) {
    return user;
  } else {
    const err = new Error('Wrong email or password');
    err.statusCode = 401;
    return Promise.reject(err)
  }
}

const User = mongoose.model('User', schema);

module.exports = User;
