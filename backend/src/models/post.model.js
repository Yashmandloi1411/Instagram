const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is required for creating post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id required for creating post"],
  },
  createdAt: {
    type: Date,
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
