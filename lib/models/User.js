const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password){
  this.passwordHash = bcrypt.hashSync(password, 14);
});

schema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'userId'
});

schema.statics.findByToken = function(token){
  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    return Promise.resolve({
      _id: tokenPayload._id,
      name: tokenPayload.name,
      email: tokenPayload.email,
      __v: tokenPayload.__v
    });
  } catch(err){
    return Promise.reject(err);
  }
};

schema.statics.authenticate = async function({ name, email, password }){
  const throwError = () => {
    const err = new Error('Invalid Username, Email, or Password');
    err.status = 401;
    throw err;
  };

  const username = await this.findOne({ name });
  const user = await this.findOne({ email });
  if(!username || !user){
    throwError();
  }

  const validPassword = bcrypt.compareSync(password, user.passwordHash);
  if(!validPassword){
    throwError();
  }

  return user;
};

schema.methods.setAuthToken = function(){
  return jwt.sign(this.toJSON(), process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

module.exports = mongoose.model('User', schema);
