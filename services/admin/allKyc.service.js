const Kyc = require("../../models/kyc.model");
const ErrorResponse = require("../../utils/errorResponse");

const allKyc = async (req, next) => {
  try {
    const allKycData = await Kyc.findAll();
    return allKycData;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = allKyc;
