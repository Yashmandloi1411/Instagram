const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "post is required for like"],
    },
    user: {
      type: String,
      ref: "users",
      required: [true, "user name is required for like"],
    },
  },
  {
    timestamps: true,
  },
);

//ek user ek post ko ek bar hi like karsachat ha multiple bar nhi
likeSchema.index({ user: 1, post: 1 }, { unique: true });

const likemodel = mongoose.model("like", likeSchema);

module.exports = likemodel;
