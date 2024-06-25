const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const otpService = require("../services/otp-service");
const createError = require("../utility/create-error");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    console.log(data);
    const existUser = await userService.findUserByEmail(data.email);
    // console.log(existUser);

    if (existUser) {
      createError({
        message: "email has been use",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password);
    console.log(data.password.length);
    console.log(data);
    await userService.createUser(data);
    res.status(200).json({ message: "register successful", data });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const { email, password } = req.input;

    const existUser = await userService.findUserByEmail(email);

    if (!existUser) {
      throw createError({
        message: "Invalid credentials",
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(password, existUser.password);

    if (!isMatch) {
      throw createError({
        message: "Invalid credentials",
        statusCode: 400,
      });
    }

    await otpService.createAndSendOTP(email); // Generate and send OTP

    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    next(err);
  }
};

authController.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const isVerified = await otpService.verifyOTP(email, otp);

    if (!isVerified) {
      throw createError({
        message: "Invalid or expired OTP",
        statusCode: 400,
      });
    }

    const user = await userService.findUserByEmail(email);
    const accessToken = jwtService.sign({ id: user.id });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};


authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
module.exports = authController;
