const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
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

schema.statics.authenticate = async function({ username, email, password }){
  const throwError = () => {
    const err = new Error('Invalid Username, Email, or Password');
    err.status = 401;
    throw err;
  };

  const name = await this.findOne({ username });
  const user = await this.findOne({ email });
  if(!name || !user){
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
