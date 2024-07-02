const prisma = require("../models/prisma");
const nodemailer = require("nodemailer");
const createError = require("../utility/create-error");

const otpService = {};

otpService.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

otpService.generateReferenceCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let refCode = "";
  for (let i = 0; i < 6; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refCode;
};

otpService.createAndSendOTP = async (email) => {
  try {
    const otp = otpService.generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpires },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes.</p>`,
    };
    console.log(otp);
    await transporter.sendMail(mailOptions);
    return { email, otp, otpExpires };
  } catch (error) {
    throw createError({
      message: error.message || "Failed to send OTP",
      statusCode: 500,
    });
  }
};

otpService.verifyOTP = async (email, otp) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.otp !== otp || new Date(user.otpExpires) < new Date()) {
    throw createError({
      message: "Invalid or expired OTP",
      statusCode: 400,
    });
  }

  await prisma.user.update({
    where: { email },
    data: { otp: null, otpExpires: null },
  });

  return true;
};

module.exports = otpService;
