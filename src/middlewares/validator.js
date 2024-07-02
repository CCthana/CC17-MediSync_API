const { loginSchema, registerSchema } = require("../validator/auth-validator");

const validator = {};

validator.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  req.input = value;
  next();
};

validator.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  req.input = value;
  next();
};
module.exports = validator;
