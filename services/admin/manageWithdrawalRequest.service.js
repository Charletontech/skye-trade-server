const { Sequelize } = require("sequelize");
const withdrawalRequests = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/user.model");

const manageWithdrawalRequest = async (req, next) => {
  try {
    const withdrawalId = req.params.withdrawalId;
    const status = req.body?.status;

    const request = await withdrawalRequests.findByPk(withdrawalId);
    if (!request) {
      throw next(
        new ErrorResponse("withdrawal request with such ID does not exist", 404)
      );
    }

    request.status = status || request.status;
    request.save();

    // debit user
    if (status === "approved") {
      const userToDebit = await User.findByPk(request.userId);
      userToDebit.balance = Sequelize.literal(`balance - ${request.amount}`);
      userToDebit.save();
      return `Withdrawal request status successfully changed to ${status}. User has been debited.`;
    }

    return `Withdrawal request status successfully changed to ${status}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = manageWithdrawalRequest;
