const withdrawalRequest = require("../../models/withdrawalRequest.model");
const ErrorResponse = require("../../utils/errorResponse");

const updateWithdrawalStatus = async (req, next) => {
  try {
    const { id, newStatus } = req.body;
    const withdrawalRowToEdit = await withdrawalRequest.findOne({
      where: { id },
    });
    withdrawalRowToEdit.status = newStatus;
    withdrawalRowToEdit.save();
    return `Withdrawal status successfully updated to ${newStatus}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = updateWithdrawalStatus;
