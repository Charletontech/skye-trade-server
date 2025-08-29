const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const accountVerificationStatus = async (req, next) => {
  try {
    const userId = req.user.id;
    let providedIdDocument = true;

    const findUser = await User.findOne({ where: { userId } });
    const { status, verificationDocumentType } = findUser;

    if (verificationDocumentType === "Not verified") {
      providedIdDocument = false;
    }

    return { providedIdDocument, status };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = accountVerificationStatus;
