const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const editUserBalance = async (req, next) => {
  try {
    const { email, newBalance } = req.body;
    const userToEdit = await User.findOne({ where: { email } });
    userToEdit.balance = newBalance;
    userToEdit.save();
    // console.log(userToEdit);
    return `successfully set ${email} balance to ${newBalance}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editUserBalance;
