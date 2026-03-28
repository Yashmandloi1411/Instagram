const express = require("express");

const postRouter = express.Router();

// multer
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postController = require("../controllers/post.controller");

// milldeware identify user
const identifyUser = require("../middleware/auth.middleware");

// post :/api/posts [protected => jiska pass token ha vhi isko access kar sachata ha]
postRouter.post(
  "/",
  identifyUser,
  upload.single("Image"),
  postController.createPostController,
);

// GET: /api/posts [protected]

postRouter.get("/", identifyUser, postController.getAllPostController);

// GET: /api/posts/details/:postId

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

//postL /api/lpost/like/:postID

// @route
// @description like a post witht the id provided in the req params
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

// @route /api/posts/dislike/:postId
// @description dislike a post with the id provided in the req params

postRouter.post(
  "/dislike/:postId",
  identifyUser,
  postController.dislikePostController,
);

module.exports = postRouter;
