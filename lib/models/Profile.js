const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dog: {
    type: dogSchema,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  userId: String
});

module.exports = mongoose.model('Profile', schema);
