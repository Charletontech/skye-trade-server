const User = require("../../models/user.model");
const withdrawalRequestModel = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");

const withdrawalRequest = async (req, res, next) => {
  try {
    var wAddress = req.body.formdata[0];
    var wType = req.body.formdata[1];
    var amount = parseInt(req.body.formdata[2]);
    var email = req.body.user;
    console.log(wAddress, wType, amount);

    // ensure email exists
    const getUser = await User.findOne({ where: { email } });
    if (!getUser) {
      throw next(new ErrorResponse("user data not found", 400));
    }

    // check if user balance is enough
    if (getUser.dataValues.balance < amount) {
      console.log(getUser.dataValues.balance, parseInt(amount));
      throw new Error("Insufficient balance for this withdrawal");
    }

    // store request in database
    const addNewWithdrawalRecord = await withdrawalRequestModel.create({
      email,
      amount,
      walletAddress: wAddress,
      walletType: wType,
      status: "pending",
    });

    if (!addNewWithdrawalRecord) {
      throw new Error(
        "Unable to save withdrawal request to database. try gain."
      );
    }
    return "withdrawal request successfully placed!";
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = withdrawalRequest;
