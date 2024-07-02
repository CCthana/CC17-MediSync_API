const express = require("express");
const validator = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");

const authRouter = express.Router();

// authRouter.post("/register",validator.registerValidator,authController.register)
authRouter.post("/login", validator.loginValidator, authController.login);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.get("/me",authController.getMe)

module.exports = authRouter;
