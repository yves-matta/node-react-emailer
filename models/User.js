const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  credits: { default: 0, type: Number },
  googleID: String
});

mongoose.model('users', userSchema);
