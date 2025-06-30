const ErrorResponse = require("../../utils/errorResponse");
const he = require("he");

const emailService = async (req, next) => {
  try {
    const { sendMailTemplate } = require("../../utils/sendMail.util");

    // Decode HTML entities in the message using he
    req.body.message = he.decode(req.body.message);

    const sentMail = await sendMailTemplate(req.body);

    if (!sentMail) {
      // throw next(new ErrorResponse("Request failed: Unable to deliver email", 500));
      throw new Error(
        "Mail delivery failed. An error occurred in the process..."
      );
    }
    return `Mail successfully delivered to ${req.body.recipient}`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = emailService;
