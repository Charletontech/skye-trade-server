const Kyc = require("../../models/kyc.model");
const ErrorResponse = require("../../utils/errorResponse");

const editKyc = async (req, next) => {
  try {
    const kycId = req.params.kycId;
    const status = req.body?.status;
    const kycData = await Kyc.findByPk(kycId);

    kycData.status = status || kycData.status;
    kycData.save();
    return `KYC status updated to ${status}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = editKyc;
