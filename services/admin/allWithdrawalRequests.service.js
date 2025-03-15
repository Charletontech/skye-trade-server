const withdrawalRequest = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");

const allWithdrawalRequests = async (req, next) => {
  try {
    const allWithdrawalRequests = await withdrawalRequest.findAll({
      raw: true,
    });
    return allWithdrawalRequests;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allWithdrawalRequests;
