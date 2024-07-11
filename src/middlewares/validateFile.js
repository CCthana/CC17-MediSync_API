const createError = require('../utility/create-error');

exports.validateFile = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(createError(400, 'Files are required'));
  }
  next();
};