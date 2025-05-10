const withdrawalRequests = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");

const withdrawalRequest = async (req, next) => {
  try {
    const { id } = req.user;
    const { amount, walletAddress, method, username } = req.body;
    const newRequest = await withdrawalRequests.create({
      userId: id,
      amount,
      username,
      walletAddress,
      method,
    });
    return `Your withdrawal request has successfully been sent for Admin approval. Withdrawal ID: ${newRequest.withdrawalId}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = withdrawalRequest;
