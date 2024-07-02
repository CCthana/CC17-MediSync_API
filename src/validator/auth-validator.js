const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


exports.registerSchema = Joi.object({
  hn: Joi.string().max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).max(60).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  phone: Joi.string().max(20).optional().allow(null, ''),
  email: Joi.string().email().max(50).optional().allow(null, ''),
  address: Joi.string().max(256).optional().allow(null, ''),
  birthDate: Joi.date().optional().allow(null),
  nationality: Joi.string().max(30).optional().allow(null, ''),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
  createdAt: Joi.date().default(() => new Date()).description('time of creation'),
  drugAllergies: Joi.string().max(128).optional().allow(null, ''),
  otp: Joi.string().optional().allow(null, ''),
  otpExpires: Joi.date().optional().allow(null)
});