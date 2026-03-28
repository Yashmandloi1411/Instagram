const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// cookie-parser
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// require routes
const authRouter = require("./routes/auth.route");

const postRouter = require("./routes/post.route");

const userRouter = require("./routes/user.route");

// using routes

// prefix
app.use("/api/auth", authRouter);

// prefix /api/posts
app.use("/api/posts", postRouter);

//prefix /api/user
app.use("/api/user", userRouter);

module.exports = app;
