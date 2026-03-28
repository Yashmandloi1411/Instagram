const userModel = require("../models/user.model");
const crypto = require("crypto");
// jwt
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  // user data save karna
  // password ko hash karna then save karna user mee
  // token create karna nd make sure vo expire ho
  // token ko store krn cookie me (use cookie-parser middleware)
  // token dena
  // make sure response me kabi bi password nhi bhajta
  // frontend pe kabai bi password nhi jata

  const { email, password, username, bio, profile_Image } = req.body;

  //   const isEmailExist = await userModel.findOne({ email });
  //   const isUserNameExist = await userModel.findOne({ username });
  //   if (isEmailExist) {
  //     return res.status(409).json({
  //       message: "email is already exist",
  //     });
  //   }

  //   if (isUserNameExist) {
  //     return res.status(409).json({
  //       message: "userr Name is already exist",
  //     });
  //   }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "user already exist",
    });
  }

  //const hash = crypto.createHash("sha256").update(password).digest("hex");

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hash,
    username,
    bio,
    profile_Image,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("Jwt_token", token);

  return res.status(201).json({
    message: "user Registration Successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profile_Image: user.profile_Image,
    },
    token,
  });
}

async function loginController(req, res) {
  // user requ for new token

  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(404).json({
      message: "Email is Not founde Kindly register",
    });
  }

  //const hash = crypto.createHash("sha256").update(password).digest("hex");
  //   const isPasswordValid = hash === user.password;

  // password -> jo user na abi dala login ke doran
  //   user.password -> jo db me pada ha already hash me register ka time

  const isPasswordValid = await bcrypt.compare(password, user.password);
  // right now for comaprasion we do like thiz but there
  // is method for compare in bcryptjs

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      user: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("Jwt_token", token);

  return res.status(200).json({
    message: "user login successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_Image: user.profile_Image,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
