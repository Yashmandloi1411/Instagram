const followModel = require("../models/follow.model");

const userModel = require("../models/user.model");

async function followUserController(req, res) {
  // user phachano middleware se nikala
  // ya me hua
  const followerusername = req.user.username;

  // jisko me follow kar rha hua
  const followeeusername = req.params.username;

  // ap apna ap ko follow nhi karsachta ho
  if (followerusername === followeeusername) {
    return res.status(400).json({
      message: "we cant follow yourself",
    });
  }

  // followee exist hi nhi karta mtb me register hi nhi hu
  const isFolloweeExists = await userModel.findOne({
    username: followeeusername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "user you are try to follow doesnt exist",
    });
  }

  // ek bar ek dusara ko follow kar liya then again nhi karoga db kyu baroga dubarasa
  const isalreadyFollowing = await followModel.findOne({
    followee: followeeusername,
    follower: followerusername,
  });
  if (isalreadyFollowing) {
    return res.status(409).json({
      message: "they already followed each other no duplicate entry",
    });
  }

  const followRecord = await followModel.create({
    follower: followerusername,
    followee: followeeusername,
  });

  return res.status(201).json({
    message: `you are now following ${followeeusername}`,
    follow: followRecord,
  });
}

// unfollow controller

async function unfollowUserController(req, res) {
  const followerusername = req.user.username;
  const followeeusername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerusername,
    followee: followeeusername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: "user not follow each other",
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  return res.status(200).json({
    message: `your are unfollow ${followeeusername} `,
  });
}

// get followeer jisna follow kiya muja

async function getFollowerController(req, res) {
  const username = req.params.username;

  const followers = await followModel.find({
    followee: username,
  });

  // user details fetch karo
  const users = await Promise.all(
    followers.map(async (f) => {
      return await userModel.findOne(
        { username: f.follower },
        { username: 1, profile_Image: 1 },
      );
    }),
  );

  return res.json({
    count: followers.length,
    followers: users,
  });
}

// jisko mena follow kiya
async function getFollowingListController(req, res) {
  const username = req.params.username;

  const following = await followModel.find({
    follower: username,
  });

  const users = await Promise.all(
    following.map(async (f) => {
      return await userModel.findOne(
        { username: f.followee },
        { username: 1, profile_Image: 1 },
      );
    }),
  );

  return res.status(200).json({
    count: following.length,
    following: users,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  getFollowerController,
  getFollowingListController,
};
