const DepositProofs = require("../../models/depositProofs.model");
const deleteFile = require("../../utils/deleteFile");
const ErrorResponse = require("../../utils/errorResponse");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const depositProof = async (req, next) => {
  const file = req.files.paymentProof[0];
  try {
    const { walletAddress, amount } = req.body;
    const cloudinary = await uploadToCloudinary(file.path);
    const newDeposit = await DepositProofs.create({
      userId: req.user.id,
      fullName: req.user.fullName,
      walletAddress,
      amount,
      proofUrl: cloudinary.secure_url,
    });
    if (!newDeposit) {
      throw next(new ErrorResponse("Failed to submit deposit proof", 500));
    }
    return "Your proof of payment has been received. Please wait for admin to verify and update your balance.";
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  } finally {
    deleteFile(file.path);
  }
};
module.exports = depositProof;
