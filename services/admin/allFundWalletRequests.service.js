const fundRequest = require("../../models/fundRequests.model");
const ErrorResponse = require("../../utils/errorResponse");

const allFundWalletRequests = (req, next) => {
  try {
    const allFundWalletRequestsData = fundRequest.findAll({ raw: true });
    return allFundWalletRequestsData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allFundWalletRequests;
