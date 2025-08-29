const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const deleteFile = require("../../utils/deleteFile");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const uploadId = async (req, next) => {
  const file = req.files.idFile[0];
  try {
    if (!req.files || !req.files.idFile) {
      throw next(new ErrorResponse("ID file is required", 400));
    }
    if (
      !file.mimetype.startsWith("image/") &&
      file.mimetype !== "application/pdf"
    ) {
      throw next(new ErrorResponse("Please upload an image or PDF file", 400));
    }

    const userId = req.user.id;
    const docType = req.body.docType;
    const cloudinaryResponse = await uploadToCloudinary(file.path);
    console.log(cloudinaryResponse.secure_url);
    const updatedUser = await User.update(
      {
        verificationDocument: cloudinaryResponse.secure_url,
        status: "pending",
        verificationDocumentType: docType,
      },
      { where: { userId }, returning: true, plain: true }
    );

    return "ID uploaded successfully. Please wait for admin approval. Admin typically approves within 2 hours.";
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  } finally {
    deleteFile(file.path);
  }
};
module.exports = uploadId;
