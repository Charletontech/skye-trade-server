const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const allUsers = async (req, next) => {
  try {
    const allUsersData = await User.findAll({ raw: true });
    return allUsersData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allUsers;
