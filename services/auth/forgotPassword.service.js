const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const forgotPassword = async (req, next) => {
  try {
    const identifier = req.body.identifier;
    const findAccount = User.findOne({
      where: {
        [Op.or]: [
          { email: identifier }, // Check if the email exists
          { username: identifier }, // Check if the username exists
        ],
      },
    });
    if (!findAccount) {
      throw next(
        new ErrorResponse(
          "Sorry, we could not find an account with that Username or Email. Check and try again.",
          404
        )
      );
    }
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = forgotPassword;
