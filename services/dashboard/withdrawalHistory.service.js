const withdrawalRequests = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");

const withdrawalHistory = async (req, next) => {
  try {
    const username = req.query?.username;
    const userWithdrawalHistory = await withdrawalRequests.findAll({
      where: { username },
      raw: true,
    });
    return userWithdrawalHistory;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = withdrawalHistory;
