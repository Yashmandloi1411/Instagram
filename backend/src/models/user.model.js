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
    select: false,
  },
  bio: String,
  follower: Array,
  profile_Image: {
    type: String,
    // default:
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
