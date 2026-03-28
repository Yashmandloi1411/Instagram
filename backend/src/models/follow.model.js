const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    // hamara pass username rhaga
    follower: {
      type: String,
    },

    followee: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "Status can only be pending,accepted or rejected",
      },
    },
    // if userid hoti to
    //
    //   follower: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    //     required: [true, "follower is required"],
    //   },

    //   followee: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    //     required: [true, "Followee is required"],
    //   },
  },
  {
    timestamps: true,
  },
);

// user a user b ko ek hi bar follow karsachat ah 2 bar nhi

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);
module.exports = followModel;
