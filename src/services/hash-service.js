const bcrypt = require('bcryptjs');
const hashService =  {};


hashService.hash = (plaintext) => bcrypt.hash(plaintext, 10);
hashService.compare = (plaintext, hashValue) => bcrypt.compare(plaintext, hashValue);

module.exports = hashService;