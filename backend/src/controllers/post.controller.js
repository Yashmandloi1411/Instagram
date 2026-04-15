const ImageKit = require("@imagekit/nodejs").default;
const { toFile } = require("@imagekit/nodejs");

const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const { urlencoded } = require("express");

const likemodel = require("../models/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// model requies
// const postModel = require("../models/post.model");

async function createPostController(req, res) {
  //const { caption, imgUrl } = req.body;

  console.log(req.body, req.file);

  const uploadResponse = await client.files.upload({
    file: await toFile(req.file.buffer, req.file.originalname),
    fileName: req.file.originalname,
    folder: "/cohor-2-InstaClone",
  });

  //   const token = req.cookies.Jwt_token;

  //   if (!token) {
  //     return res.status(401).json({
  //       message: "token must be required,anautorized access",
  //     });
  //   }

  //   console.log("token", token);

  //   const decode = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log("decode", decode);

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: uploadResponse.url,
    // user: decode.user,
    user: req.user.user,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });

  //   res.send(file);
}

async function getAllPostController(req, res) {
  // token nikal kyu rha ha ?
  // identify kar payga ki kis user ne req kiya ha
  //   const token = req.cookies.Jwt_token;

  //   let decode = null;
  //   try {
  //     decode = jwt.verify(token, process.env.JWT_SECRET);
  //     console.log("decode for get all post data", decode);
  //   } catch (error) {
  //     return res.status(401).json({
  //       message: "Unautorized",
  //     });
  //   }

  //   const userId = decode.user;

  const posts = await postModel.find({
    user: req.user.id,
  });

  return res.status(200).json({
    posts,
    message: "successfully get all post",
  });
}

async function getPostDetailsController(req, res) {
  //   const token = req.cookies.Jwt_token;

  //   let decode;
  //   try {
  //     decode = jwt.verify(token, process.env.JWT_SECRET);
  //   } catch (error) {
  //     return res.status(401).json({
  //       message: "Invalid Token",
  //     });
  //   }

  //   const userId = decode.user;
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById({ postId });

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  // ya post jo fetch huai ha ya usi user ki ha
  // isma compare obj id horhi ha
  // but js me asa comparison  nhi hota alaga method hoti ha

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "forbidden content ",
    });
  }

  return res.status(200).json({
    message: "fetch post",
    post,
  });
}

async function likePostController(req, res) {
  // kon se user like kar rha h
  //const username = req.user.username;
  const username = req.user.username;

  //kon si post like kar rha ha
  const postId = req.params.postId;

  // ek user post ko like karta ha but post exist kart bi ha

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "post you search is not exist",
    });
  }

  // like karna ka liya like model ki need rhagi
  const like = await likemodel.create({
    post: postId,
    user: username,
  });

  return res.status(200).json({
    message: "post like successfully",
    like,
  });
}

async function UnlikePostController(req, res) {
  const username = req.user.username;
  //kon si post like kar rha ha
  const postId = req.params.postId;

  // ya find karage ki post like be ha ya nhi
  const isliked = await likemodel.findOne({
    post: postId,
    user: username,
  });

  if (!isliked) {
    return res.status(400).json({
      message: "user profile is already not liked",
    });
  }
  await likemodel.findOneAndDelete({ _id: isliked._id });

  return res.status(200).json({
    message: "post unlike successfully",
  });
}

async function getAllFeedController(req, res) {
  const username = req.user.username;

  const posts = await Promise.all(
    (
      await postModel.find().populate("user").sort({ createdAt: -1 }).lean()
    ).map(async (post) => {
      const isLiked = await likemodel.findOne({
        user: username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked); // ✅ true/false add karo
      return post; // ✅ pura post return karo
    }),
  );

  return res.status(200).json({
    message: "successfully fetch all feed",
    posts,
  });
}

module.exports = {
  createPostController,
  getAllPostController,
  getPostDetailsController,
  likePostController,
  getAllFeedController,
  UnlikePostController,
};
