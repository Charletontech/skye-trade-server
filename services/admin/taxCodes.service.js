const ErrorResponse = require("../../utils/errorResponse");
const TaxCodes = require("../../models/taxCodes.model");
const taxCodes = async (req, next) => {
  try {
    const allTaxCodes = await TaxCodes.findAll();
    return allTaxCodes;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};
module.exports = taxCodes;
