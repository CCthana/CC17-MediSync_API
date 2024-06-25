const jwtService = require("../Services/jwtService");
const userService = require("../services/user-service");

const createError = require("../utils/createError");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }
    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);
    console.log(payload);
    const user = await userService.findUserById(payload.id);
    if (!user) {
      createError({
        message: "user was not found",
        statusCode: 400,
      });
    }
    delete user.password;

    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
