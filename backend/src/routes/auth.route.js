const expresss = require("express");

const authRouter = expresss.Router();

const authController = require("../controllers/auth.controller");
// register

authRouter.post("/register", authController.registerController);
// login

authRouter.post("/login", authController.loginController);

module.exports = authRouter;
