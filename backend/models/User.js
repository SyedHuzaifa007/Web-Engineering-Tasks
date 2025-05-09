const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  email: { type: String, unique: true },
  active: Boolean,
  minor: Boolean,
  inactive: Boolean
});

module.exports = mongoose.model('User', userSchema);
