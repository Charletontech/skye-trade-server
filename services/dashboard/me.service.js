const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const me = async (req, next) => {
  try {
    const { id, email } = req.user;
    const userData = await User.findOne({ where: { userId: id }, raw: true });
    const { balance, username, currency, accountType } = userData;

    // in newer versions, fetch live Bitcoin data here
    const btc = balance / 94292;

    return { balance, username, currency, btc, accountType };
  } catch (err) {
    throw next(ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = me;
