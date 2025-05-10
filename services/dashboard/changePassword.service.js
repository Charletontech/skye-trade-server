const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const changePassword = async (req, next) => {
  try {
    let { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    const getUser = await User.findOne({ where: { userId: id } });
    const isMatch = await bcrypt.compare(oldPassword, getUser.password);

    if (!isMatch) {
      throw next(new ErrorResponse("Old password is incorrect", 401));
    }

    newPassword = await bcrypt.hash(newPassword, 10);
    getUser.password = newPassword;
    getUser.save();

    return "Password successfully changed!";
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = changePassword;
