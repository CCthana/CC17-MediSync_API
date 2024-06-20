const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
   windowMs: 10 * 60 * 1000, 
   limit: 99,
   message: {message: 'Too many requested'}
});

module.exports = limiter;