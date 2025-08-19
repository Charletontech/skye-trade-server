const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const updateUserStatus = async (req, next) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    // Validate userId and status
    if (!userId || !status) {
      throw new ErrorResponse("User ID and status are required", 400);
    }
    // Update user status
    const updatedUser = await User.update({ status }, { where: { userId } });
    if (!updatedUser[0]) {
      throw new ErrorResponse("User not found or status not updated", 404);
    }
    return { message: "User status updated successfully " + status };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = updateUserStatus;
