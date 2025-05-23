const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const me = async (req, next) => {
  try {
    const { id } = req.user;
    const userData = await User.findOne({ where: { userId: id }, raw: true });
    const {
      fullName,
      phone,
      email,
      balance,
      username,
      currency,
      accountType,
      country,
    } = userData;

    // in newer versions, fetch live Bitcoin data here
    const btc = balance / 94292;

    return {
      fullName,
      phone,
      email,
      balance,
      username,
      currency,
      btc,
      accountType,
      country,
    };
  } catch (err) {
    throw next(ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = me;
