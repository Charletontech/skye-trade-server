const { Sequelize } = require("sequelize");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const editUser = async (req, next) => {
  try {
    const action = req.body.action;
    const amount = req.body?.amount;
    const accountType = req.body?.accountType;
    const status = req.body?.status;
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    var message = `${action} action successfully executed!`;

    switch (action) {
      case "credit":
        if (!amount) noAmountError();
        user.balance = Sequelize.literal(`balance + ${amount}`);
        user.save();
        break;
      case "debit":
        if (!amount) noAmountError();
        user.balance = Sequelize.literal(`balance - ${amount}`);
        user.save();
        break;
      case "reset":
        if (!amount) noAmountError();
        user.balance = amount;
        user.save();
        break;
      case "switchAccount":
        if (!accountType)
          throw next(new ErrorResponse("Select accountType to switch to", 400));
        user.accountType = accountType;
        user.save();
        break;
      case "updateStatus":
        await updateUserStatus();
        break;
      default:
        throw next(new ErrorResponse("Invalid action selected", 400));
    }

    return message;

    function noAmountError() {
      throw next(new ErrorResponse("No amount was set", 400));
    }

    async function updateUserStatus() {
      await user.update({ where: { userId }, status });
      message = `User status updated to ${status}. User Id: ${userId}`;
    }
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editUser;
