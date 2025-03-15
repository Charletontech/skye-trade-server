const fundRequest = require("../../models/fundRequests.model");
const ErrorResponse = require("../../utils/errorResponse");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const deleteFile = require("../../utils/deleteFile");

const uploadReceipt = async (req, next) => {
  let filePathToDelete;
  try {
    const email = req.user.email;
    const filepath = req.file.path;
    filePathToDelete = filepath;

    const cloudinaryUploadResult = await uploadToCloudinary(filepath, "cexbuy");

    // store in database
    const addNewReceipt = await fundRequest.create({
      email,
      receiptUrl: cloudinaryUploadResult.secure_url,
    });

    if (!addNewReceipt) {
      throw new Error(
        "error saving screenshot receipt to database. Please upload again."
      );
    }

    return "Fund request sent successfully. An admin will update ur balance within 24 hours";
  } catch (err) {
    throw next(new ErrorResponse(err, 500));
  } finally {
    deleteFile(filePathToDelete);
  }
};
module.exports = uploadReceipt;
