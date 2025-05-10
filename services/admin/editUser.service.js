const { Sequelize } = require("sequelize");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const editUser = async (req, next) => {
  try {
    const action = req.body.action;
    const amount = req.body?.amount;
    const accountType = req.body?.accountType;
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

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

      default:
        throw next(new ErrorResponse("Invalid action selected", 400));
    }

    return `${action} action successfully executed!`;

    function noAmountError() {
      throw next(new ErrorResponse("No amount was set", 400));
    }
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editUser;
