const ErrorResponse = require("../../utils/errorResponse");

const changePassword = async (req, next) => {
  try {
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = changePassword;
