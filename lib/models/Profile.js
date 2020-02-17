const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dog: {
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
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Profile', schema);
