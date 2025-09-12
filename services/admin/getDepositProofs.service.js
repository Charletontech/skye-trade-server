const DepositProofs = require("../../models/depositProofs.model");
const ErrorResponse = require("../../utils/errorResponse");

const getDepositProofs = async (req, next) => {
  try {
    const getDepositProofsData = await DepositProofs.findAll();
    return getDepositProofsData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = getDepositProofs;
