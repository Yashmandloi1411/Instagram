const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exist"],
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "password is requried"],
  },
  bio: String,
  follower: Array,
  profile_Image: {
    type: String,
    // default:
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
