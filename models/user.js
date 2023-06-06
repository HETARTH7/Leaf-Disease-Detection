const mongoose = require("mongoose");

const userSchema = {
  username: String,
  password: String,
  fname: String,
  lname: String,
  phno: Number,
  email: String,
};

const User = new mongoose.model("User", userSchema);

module.exports = User;