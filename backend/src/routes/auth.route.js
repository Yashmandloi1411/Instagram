const expresss = require("express");

const authRouter = expresss.Router();

const authController = require("../controllers/auth.controller");
const identifyUser = require("../middleware/auth.middleware");
// register

authRouter.post("/register", authController.registerController);

// login

authRouter.post("/login", authController.loginController);

/**
 * @route Get /api/auth/get-me
 * @description Get the current logged in information
 *  @Access  Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController);
module.exports = authRouter;
