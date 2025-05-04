const Kyc = require("../../models/kyc.model");
const ErrorResponse = require("../../utils/errorResponse");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const kyc = async (req, next) => {
  try {
    const { id } = req.user;
    const { idType } = req.body;
    const uploadedFiles = Object.values(req.files);
    var kycInfo = {};

    // check if user already has a kyc record
    const existingKycRecord = await Kyc.findOne({ where: { userId: id } });
    if (existingKycRecord) {
      return `You have already submitted your KYC. Please wait for admin verification.`;
    }

    // save kyc info to DB if no record exists
    for (const file of uploadedFiles) {
      const cloudinaryUploadResponse = await uploadToCloudinary(
        file[0].path,
        "skyeTradeKyc"
      );
      const fieldname = file[0].fieldname;
      if (fieldname === "idFront") {
        kycInfo.idFrontUrl = cloudinaryUploadResponse.secure_url;
      } else {
        kycInfo.idBackUrl = cloudinaryUploadResponse.secure_url;
      }
    }

    // store in DB
    const newKycRecord = await Kyc.create({
      userId: id,
      idType,
      idFrontUrl: kycInfo.idFrontUrl,
      idBackUrl: kycInfo.idBackUrl,
    });
    console.log(newKycRecord);
    return `KYC data successfully submitted for Admin verification`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = kyc;
