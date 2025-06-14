const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const { Op } = require("sequelize");

const resetPasswordWithOtp = async (req, next) => {
  try {
    const { identifier, otp, newPassword } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
        resetOtp: otp,
        resetOtpExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      throw next(new ErrorResponse("Invalid or expired OTP.", 400));
    }

    // Set new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    return { message: "Password reset successful." };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = resetPasswordWithOtp;
