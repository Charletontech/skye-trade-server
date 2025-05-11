const TaxCodes = require("../../models/taxCodes.model");
const ErrorResponse = require("../../utils/errorResponse");

const verifyTaxCode = async (req, next) => {
  try {
    const { id } = req.user;
    const taxCode = req.query.taxCode;
    const taxCodeVerified = await TaxCodes.findOne({ where: { taxCode } });
    if (!taxCodeVerified) {
      throw next(new ErrorResponse("Invalid TaxCode!", 404));
    }
    if (taxCodeVerified.dataValues.status === "used") {
      throw next(
        new ErrorResponse(
          "This TaxCode has already been used. Please use a new one.",
          400
        )
      );
    }
    // update taxCode status to used
    await TaxCodes.update({ status: "used" }, { where: { taxCode } });
    return `TaxCode ${taxCode} has been successfully verified and used`;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = verifyTaxCode;

// for admin remember to create logic for generating tax code
