const fundRequest = require("../../models/fundRequests.model");
const ErrorResponse = require("../../utils/errorResponse");

const updateFundWalletStatus = async (req, next) => {
  try {
    const { id, newStatus } = req.body;
    const fundRequestRowToEdit = await fundRequest.findOne({
      where: { id },
    });
    fundRequestRowToEdit.status = newStatus;
    fundRequestRowToEdit.save();
    return `Fund wallet request status successfully updated to ${newStatus}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = updateFundWalletStatus;
