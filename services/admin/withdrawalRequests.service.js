const ErrorResponse = require("../../utils/errorResponse");
const withdrawalRequestsModel = require("../../models/withdrawalRequest.model");

const withdrawalRequests = async (req, next) => {
  try {
    const allWithdrawalRequests = await withdrawalRequestsModel.findAll();
    return allWithdrawalRequests;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = withdrawalRequests;
