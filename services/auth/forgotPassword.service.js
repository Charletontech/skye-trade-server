const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const { Op } = require("sequelize");
const {
  sendMailTemplate,
  sendAutomatedMail,
} = require("../../utils/sendMail.util");

const forgotPassword = async (req, next) => {
  try {
    const identifier = req.body.identifier;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      throw next(
        new ErrorResponse(
          "Sorry, we could not find an account with that Username or Email. Check and try again.",
          404
        )
      );
    }

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save OTP and expiry to user
    user.resetOtp = otp;
    user.resetOtpExpires = otpExpires;
    await user.save();

    // Send OTP to user's email
    await sendAutomatedMail("fp", user.email, otp, identifier);

    return { message: "OTP sent to your email address." };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = forgotPassword;
