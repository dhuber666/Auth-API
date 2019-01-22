const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, select: false }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
