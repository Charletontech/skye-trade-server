const ErrorResponse = require("../../utils/errorResponse");

const emailService = async (req, next) => {
  try {
    const x = {
      heading: "Welcome to SkyeTrade Finance 👋",
      greeting: "Hi there!",
      message:
        "Congratulations on your account creation with us. We're excited to have you on board. Explore your dashboard and start trading smartly with SkyeTrade today.",
    };
    const { sendMailTemplate } = require("../../utils/sendMail.util");
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
