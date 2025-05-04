const Kyc = require("../../models/kyc.model");
const ErrorResponse = require("../../utils/errorResponse");

const checkKycStatus = async (req, next) => {
  try {
    const { id } = req.user;
    const kycStatus = await Kyc.findOne({ where: { userId: id }, raw: true });
    // check if user already has a kyc record
    if (!kycStatus) {
      throw next(new ErrorResponse("No KYC submitted yet", 404));
    } else {
      return kycStatus.status;
    }
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = checkKycStatus;
