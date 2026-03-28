const express = require("express");

const userRouter = express.Router();

// const userController = require("../controllers/user.controller");
const followController = require("../controllers/user.controller");
const unfollowController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");

// proper commenting
// @route post/api/users/follow/:username
// @description follow a user
// @access private

userRouter.post(
  "/follow/:username",
  identifyUser,
  followController.followUserController,
);

userRouter.post(
  "/unfollow/:username",
  identifyUser,
  unfollowController.unfollowUserController,
);
module.exports = userRouter;
