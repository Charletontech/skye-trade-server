const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const deleteAccount = async (req, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw next(new ErrorResponse("User ID is required", 400));
    }

    // delete the user account
    const deletedUser = await User.destroy({ where: { userId } });
    if (!deletedUser) {
      throw next(new ErrorResponse("User not found", 404));
    }
    return {
      message: `User account deleted successfully.`,
    };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = deleteAccount;
