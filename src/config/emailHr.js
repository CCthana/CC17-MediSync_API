const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_HR,
      pass: process.env.PASS_EMAIL_HR,
    },
  });

  module.exports = transporter